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
  tags: EpigramTag[];
  referenceUrl?: UrlType;
  referenceTitle?: EpigramReferenceTitle;
  author: EpigramAuthor;
  content: EpigramContent;
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

interface EpigramDetailType extends EpigramListType {
  isLiked?: boolean;
}

interface CreateEpigramBody extends EpigramBaseBody {}

interface UpdateEpigramBody extends EpigramBaseBody {}
