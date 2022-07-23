import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNotEmpty } from 'class-validator';
// eslint-disable-next-line prettier/prettier
import { Like, Repository } from 'typeorm';
import { NoteCreateDto } from './dto/note-create.dto';
import { NoteUpdateDto } from './dto/note-update.dto';
import { NoteEntity } from './entities/note.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}
  async getNoteById(note_id: string): Promise<NoteEntity> {
    return await this.noteRepository.findOneBy({
      uuid: note_id,
    });
  }
  async deleteNote(note_id: string, user_id: string): Promise<boolean> {
    const note = await this.getNote(note_id, user_id);
    if (note == null) return false;
    await this.noteRepository.delete({ uuid: note_id });
    return true;
  }
  async markCompleted(user_id: string, note_id: string): Promise<boolean> {
    const entity = await this.getNote(note_id, user_id);
    if (entity == null) return false;
    entity.completed = true;
    await this.noteRepository.save(entity);
    return true;
  }
  async createNote(user_id: string, schema: NoteCreateDto): Promise<string> {
    if ((await this.getNoteByName(user_id, schema.name)) != null) return null;
    const entity = this.noteRepository.create({ user_id: user_id, ...schema });
    await this.noteRepository.save(entity);
    return entity.uuid;
  }
  async getNote(note_id: string, user_id: string): Promise<NoteEntity> {
    return await this.noteRepository.findOneBy({
      uuid: note_id,
      user_id: user_id,
    });
  }
  async getUserNotes(user_id: string): Promise<NoteEntity[]> {
    return await this.noteRepository.findBy({
      user_id: user_id,
    });
  }
  async updateNote(
    user_id: string,
    note_id: string,
    schema: NoteUpdateDto,
  ): Promise<boolean> {
    const entity = await this.getNote(note_id, user_id);
    if (entity == null) return false;
    if (isNotEmpty(schema.name)) entity.name = schema.name;
    if (isNotEmpty(schema.text)) entity.text = schema.text;
    await this.noteRepository.save(entity);
    return true;
  }
  async getNoteByName(user_id: string, name: string): Promise<NoteEntity> {
    return await this.noteRepository.findOneBy({
      name: name,
      user_id: user_id,
    });
  }
  async getNoteByNameSubstr(
    user_id: string,
    substr: string,
  ): Promise<NoteEntity[]> {
    return await this.noteRepository.findBy({
      user_id: user_id,
      name: Like(substr),
    });
  }
}
