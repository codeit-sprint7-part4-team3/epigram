type EpigramContent = string;
type EpigramAuthor = string;
type EpigramReferenceTitle = string;
type LikeCount = number;
type TagName = string;

interface EpigramTag {
  name: TagName;
  id: Id;
}

interface EpigramBaseBody {
  content: EpigramContent;
  author: EpigramAuthor;
  referenceTitle?: EpigramReferenceTitle;
  referenceUrl?: UrlType;
  tags: EpigramTag[];
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
