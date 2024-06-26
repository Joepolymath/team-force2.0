import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, SignupDto } from '../dto/auth-credentials.dto';
import { UsersRepository } from '../users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { UserStatus } from '../entities/user-status.entity';
import { Repository } from 'typeorm';
import { AssignBusinessUnitDto } from '../dto/assign-business-unit.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(UserStatus)
    private userStatusRepository: Repository<UserStatus>,
    // @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: SignupDto): Promise<void> {
    const { statusId, ...userDetails } = authCredentialsDto;
    const status = statusId
      ? await this.userStatusRepository.findOne({ where: { id: statusId } })
      : null;

    const userWithStatus = {
      ...userDetails,
      status,
    };

    const user = this.usersRepository.create(userWithStatus);
    return this.usersRepository.createUser(user);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, id: user.id };

      const accessToken: string = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  }

  async assignBusinessUnit(payload: AssignBusinessUnitDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: payload.userId },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    // const foundBusinessUnit =
  }
}
