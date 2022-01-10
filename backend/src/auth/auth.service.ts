import { LoginDto } from './dto/login.do';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import ApiFeatch from 'src/utils/apiFeatcher';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    let user = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.repository.save(user);
    const token = await ApiFeatch.assignJwtToken(user.id, this.jwtService);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = await ApiFeatch.assignJwtToken(user.id, this.jwtService);
    return { token };
  }

  async findUserById(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }
}
