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

interface CursorBasedPaginationResponse_CommentType {
  totalCount: number;
  nextCursor: number | null;
  list: CommentType;
}

interface CreateCommentBody {
  epigramId: Id;
  isPrivate: boolean;
  content: CommentContent;
}

interface UpdateCommentBody {
  isPrivate?: boolean;
  content?: CommentContent;
}
