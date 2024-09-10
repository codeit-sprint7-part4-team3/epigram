type CommentContent = string;

interface Writer {
  image: UrlType | null;
  nickname: Nickname;
  id: Id;
}

interface CommentType extends Timestamps {
  epigramId: Id;
  writer: Writer;
  isPrivate: boolean;
  content: CommentContent;
  id: Id;
}

interface CreateCommentBody {
  epigramId: Id;
  isPrivate: boolean;
  content: CommentContent;
}

export interface UpdateCommentBody {
  isPrivate?: boolean;
  content?: CommentContent;
}
