import { IsUUID } from 'class-validator';

export class GetPublicInfoParams {
  @IsUUID()
  id: string;
}
