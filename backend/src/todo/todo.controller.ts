// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isNotEmpty } from 'class-validator';
import { User } from 'src/auth/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdDto } from 'src/users/dto/user-id.dto';
import { NoteCreateDto } from './dto/note-create.dto';
import { NoteUpdateDto } from './dto/note-update.dto';
import { NoteEntity } from './entities/note.entity';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Todoist API')
@Controller('note')
export class TodoController {
  constructor(private readonly service: TodoService) {}
  @Post('')
  async createNote(
    @User() user: UserIdDto,
    @Body() schema: NoteCreateDto,
  ): Promise<string> {
    return await this.service.createNote(user.id, schema);
  }
  @Get('')
  async getNoteByUserId(@User() user: UserIdDto): Promise<NoteEntity[]> {
    if (!isNotEmpty(user.id)) return null;
    return await this.service.getUserNotes(user.id);
  }
  @Put(':note_id')
  async updateNote(
    @User() user: UserIdDto,
    @Param('note_id') note_id: string,
    @Body() schema: NoteUpdateDto,
  ): Promise<boolean> {
    return await this.service.updateNote(user.id, note_id, schema);
  }
  @Delete(':note_id')
  async deleteNote(
    @User() user: UserIdDto,
    @Param('note_id') note_id: string,
  ): Promise<boolean> {
    return await this.service.deleteNote(note_id, user.id);
  }
  @Post('mark/:note_id')
  async markCompleted(
    @User() user: UserIdDto,
    @Param('note_id') note_id: string,
  ): Promise<boolean> {
    return await this.service.markCompleted(user.id, note_id);
  }
  @Get(':substr')
  async getBySubStr(
    @User() user: UserIdDto,
    @Param('substr') substr: string,
  ): Promise<NoteEntity[]> {
    return await this.service.getNoteByNameSubstr(user.id, substr);
  }
}
