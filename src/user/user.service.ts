import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UsersRef } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRef)
    private usersRepository: Repository<UsersRef>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersRef> {
    const { name, email, password, referalCode } = createUserDto;

    // Generate a unique 6-digit referral code
    let newReferralCode: number;
    do {
        newReferralCode = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    } while (await this.usersRepository.findOne({ where: { referalCode: newReferralCode } }));

    const hashedpass = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = this.usersRepository.create({
        name,
        email,
        password : hashedpass,
        referalCode: newReferralCode,
        referedUsers: [],
    });

    

    if (referalCode) {
        // Find the referring user
        const referringUser = await this.usersRepository.findOne({ where: { referalCode } });

        if (!referringUser) {
            throw new Error('Invalid referral code.');
        }

        // Assign referalBy to the referring user's ID
        newUser.referalBy = referringUser.id;
        
        const uuser = await this.usersRepository.save(newUser)

        // Add the new user's referral code to the referring user's referedUsers array
        referringUser.referedUsers = [...(referringUser.referedUsers || []), uuser.id];

        // Save the referring user with the updated referedUsers array
        await this.usersRepository.save(referringUser);
    }

    // Save the new user
    return this.usersRepository.save(newUser);
}



  async findAll(): Promise<UsersRef[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<UsersRef> {
    console.log(id);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async login(createUserDto: CreateUserDto): Promise<UsersRef> {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findOne({ where: { email, password } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UsersRef | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

}

