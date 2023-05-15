import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

function transformToNumber({ value }: TransformFnParams) {
  if (typeof value === 'string' || typeof value === 'number') {
    return Number(value);
  }

  return value;
}

export class PaginatedRequestDto {
  @Transform(transformToNumber)
  @IsInt()
  @IsOptional()
  offset?: number;

  @Transform(transformToNumber)
  @IsInt()
  @IsOptional()
  limit?: number;
}
