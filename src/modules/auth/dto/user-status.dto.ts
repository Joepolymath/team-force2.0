import { IsString } from 'class-validator';

export class CreateUserStatusDto {
  @IsString()
  status: string;
}
