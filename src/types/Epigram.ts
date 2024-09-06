import { Id, Nickname, Timestamps, UrlType } from '@/types/CommonTypes';

type EpigramContent = string;
type EpigramAuthor = string;
type EpigramReferenceTitle = string;
type likeCount = number;
type TagName = string;

interface Tag {
  name: TagName;
  id: Id;
}

interface EpigramListType {
  tags: Tag[];
  writerId: Id;
  referenceUrl: UrlType | null;
  referenceTitle: EpigramReferenceTitle | null;
  author: EpigramAuthor;
  content: EpigramContent;
  id: Id;
}

interface CreateEpigramBody {
  tags: Tag[];
  referenceUrl?: UrlType;
  referenceTitle?: EpigramReferenceTitle;
  author: EpigramAuthor;
  content: EpigramContent;
}

interface UpdateEpigramBody {
  tags: Tag[];
  referenceUrl?: UrlType;
  referenceTitle?: EpigramReferenceTitle;
  author: EpigramAuthor;
  content: EpigramContent;
}
