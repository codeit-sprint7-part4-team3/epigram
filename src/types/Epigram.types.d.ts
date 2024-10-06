type EpigramContent = string;
type EpigramAuthor = string;
type EpigramReferenceTitle = string;
type LikeCount = number;
type EpigramTagName = string;

interface EpigramTag {
  name: EpigramTagName;
  id: Id;
}

interface EpigramBaseBody {
  id: number;
  content: EpigramContent;
  author: EpigramAuthor;
  referenceTitle?: EpigramReferenceTitle;
  referenceUrl?: UrlType;
  tags: EpigramTagName[];
}

interface EpigramListType {
  likeCount: LikeCount;
  tags: EpigramTag[];
  writerId: Id;
  referenceUrl: UrlType | null;
  referenceTitle: EpigramReferenceTitle | null;
  author: EpigramAuthor;
  content: EpigramContent;
  id: Id;
}

interface CursorBasedPaginationResponse_EpigramListType {
  totalCount: number;
  nextCursor: number | null;
  list: EpigramListType;
}

interface EpigramDetailType extends EpigramListType {
  isLiked?: boolean;
}

interface CreateEpigramBody extends EpigramBaseBody {}

interface UpdateEpigramBody extends EpigramBaseBody {}
