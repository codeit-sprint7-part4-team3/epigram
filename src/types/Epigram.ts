import { Id, Nickname, Timestamps, UrlType } from '@/types/CommonTypes';

type EpigramContent = string;
type EpigramAuthor = string;
type EpigramReferenceTitle = string;
type LikeCount = number;
type TagName = string;

export interface Tag {
  name: TagName;
  id: Id;
}

interface EpigramBaseBody {
  tags: Tag[];
  referenceUrl?: UrlType;
  referenceTitle?: EpigramReferenceTitle;
  author: EpigramAuthor;
  content: EpigramContent;
}

export interface EpigramListType {
  likeCount: LikeCount;
  tags: Tag[];
  writerId: Id;
  referenceUrl: UrlType | null;
  referenceTitle: EpigramReferenceTitle | null;
  author: EpigramAuthor;
  content: EpigramContent;
  id: Id;
}

export interface EpigramDetailType extends EpigramListType {
  isLiked?: boolean;
}

export interface CreateEpigramBody extends EpigramBaseBody {}

export interface UpdateEpigramBody extends EpigramBaseBody {}
