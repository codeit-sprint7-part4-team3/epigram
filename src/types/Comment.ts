import { Id, Nickname, Timestamps, UrlType } from '@/types/CommonTypes';

type CommentContent = string;

export interface Writer {
  image: UrlType | null;
  nickname: Nickname;
  id: Id;
}

export default interface CommentType extends Timestamps {
  epigramId: Id;
  writer: Writer;
  isPrivate: boolean;
  content: CommentContent;
  id: Id;
}

export interface CreateCommentBody {
  epigramId: Id;
  isPrivate: boolean;
  content: CommentContent;
}

export interface UpdateCommentBody {
  isPrivate?: boolean;
  content?: CommentContent;
}
