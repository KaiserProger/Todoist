export interface NoteType {
    uuid: string;
    user_uuid: string;
    name: string;
    text: string;
    created_at: Date;
    completed: boolean;
}

export interface NoteCreateDto {
    name: string;
    text: string;
}
