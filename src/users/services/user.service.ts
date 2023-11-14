import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async registerAccount(): Promise<void> {
    // You need to provide the data for creating a new user
    const newUser = this.usersRepository.create({
      /* user data */
    });
    await this.usersRepository.save(newUser);
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(req: any): Promise<any> {
    const username = req?.username?.toLowerCase();
    const password = req?.password;

    // Check if the username already exists
    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new Error('Username is already taken');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);

    return { message: 'User registered successfully' };
  }
}
