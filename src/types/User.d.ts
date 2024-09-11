interface User extends Timestamps {
  image: UrlType | null;
  teamId: string;
  nickname: Nickname;
  id: Id;
}

interface UpdateUserBody {
  image?: UrlType;
  nickname?: Nickname;
}
