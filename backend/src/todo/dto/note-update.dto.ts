import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class NoteUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  text: string;
}
