import { IsUUID } from 'class-validator';

export class AssignBusinessUnitDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  businessUnitId: string;
}
