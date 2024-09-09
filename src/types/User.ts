import { Id, Nickname, Timestamps, UrlType } from '@/types/CommonTypes';

export default interface UserType extends Timestamps {
  image: UrlType | null;
  teamId: string;
  nickname: Nickname;
  id: Id;
}

export interface UpdateUserBody {
  image?: UrlType;
  nickname?: Nickname;
}
