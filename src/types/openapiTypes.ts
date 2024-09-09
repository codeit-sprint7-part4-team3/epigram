/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface components {
  schemas: {
    /** Format: int32 */
    Id: number;
    /** @example 닉네임 */
    Nickname: string;
    /**
     * Format: url
     * @example https://example.com/...
     */
    UrlType: string;
    User: {
      image: components['schemas']['UrlType'] | null;
      /** Format: date-time */
      updatedAt: string;
      /** Format: date-time */
      createdAt: string;
      teamId: string;
      nickname: components['schemas']['Nickname'];
      id: components['schemas']['Id'];
    };
    UpdateUserBody: {
      image?: components['schemas']['UrlType'];
      nickname?: components['schemas']['Nickname'];
    };
    CommentContent: string;
    CommentType: {
      /** Format: double */
      epigramId: number;
      writer: {
        image: string | null;
        nickname: string;
        /** Format: double */
        id: number;
      };
      /** Format: date-time */
      updatedAt: string;
      /** Format: date-time */
      createdAt: string;
      isPrivate: boolean;
      content: components['schemas']['CommentContent'];
      /** Format: double */
      id: number;
    };
    CursorBasedPaginationResponse_CommentType_: {
      /** Format: double */
      totalCount: number;
      /** Format: double */
      nextCursor: number | null;
      list: components['schemas']['CommentType'][];
    };
    /** @enum {string} */
    '_36_Enums.OauthProvider': 'GOOGLE' | 'NAVER' | 'KAKAO';
    OauthProvider: components['schemas']['_36_Enums.OauthProvider'];
    /** @description 간편 로그인을 위한 인증 키 입니다.
     *
     *     * Google 의 경우에는 "클라이언트 id" 입니다.
     *     * Kakao 의 경우에는 "REST API 키" 입니다.
     *     * Naver 의 경우에는 "Client ID" 입니다.
     *
     *     실습을 위해 발급받은 키를 등록해주세요. 실제 서비스에서 사용 하는 키는 등록하시면 안됩니다. */
    AppKey: string;
    /** @description 간편 로그인을 위한 비밀 키 입니다.
     *
     *     * Google 의 경우에는 필요하지 않습니다.
     *     * Kakao 의 경우에는 필요하지 않습니다.
     *     * Naver 의 경우에는 "Client Secret" 입니다. */
    AppSecret: string;
    OauthApp: {
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      appSecret: components['schemas']['AppSecret'] | null;
      appKey: components['schemas']['AppKey'];
      provider: components['schemas']['OauthProvider'];
      teamId: string;
      id: components['schemas']['Id'];
    };
    UpsertOauthAppRequestBody: {
      appSecret?: components['schemas']['AppSecret'];
      appKey: components['schemas']['AppKey'];
      provider: components['schemas']['OauthProvider'];
    };
    /** @example 에피그램 내용입니다. */
    EpigramContent: string;
    /** @example 저자 */
    EpigramAuthor: string;
    EpigramReferenceTitle: string;
    /** @example 태그 */
    TagName: string;
    EpigramListType: {
      /** Format: double */
      likeCount: number;
      tags: {
        name: components['schemas']['TagName'];
        id: components['schemas']['Id'];
      }[];
      writerId: components['schemas']['Id'];
      referenceUrl: components['schemas']['UrlType'] | null;
      referenceTitle: components['schemas']['EpigramReferenceTitle'] | null;
      author: components['schemas']['EpigramAuthor'];
      content: components['schemas']['EpigramContent'];
      id: components['schemas']['Id'];
    };
    CreateEpigramBody: {
      tags: components['schemas']['TagName'][];
      referenceUrl?: components['schemas']['UrlType'];
      referenceTitle?: components['schemas']['EpigramReferenceTitle'];
      author: components['schemas']['EpigramAuthor'];
      content: components['schemas']['EpigramContent'];
    };
    CursorBasedPaginationResponse_EpigramListType_: {
      /** Format: double */
      totalCount: number;
      /** Format: double */
      nextCursor: number | null;
      list: components['schemas']['EpigramListType'][];
    };
    EpigramDetailType: components['schemas']['EpigramListType'] & {
      isLiked?: boolean;
    };
    UpdateEpigramBody: {
      tags?: components['schemas']['TagName'][];
      referenceUrl?: components['schemas']['UrlType'];
      referenceTitle?: components['schemas']['EpigramReferenceTitle'];
      author?: components['schemas']['EpigramAuthor'];
      content?: components['schemas']['EpigramContent'];
    };
    /** @enum {string} */
    '_36_Enums.Emotion': 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
    Emotion: components['schemas']['_36_Enums.Emotion'];
    EmotionLogType: {
      /** Format: date-time */
      createdAt: string;
      emotion: components['schemas']['Emotion'];
      /** Format: double */
      userId: number;
      /** Format: double */
      id: number;
    };
    UpsertEmotionLogBody: {
      emotion: components['schemas']['Emotion'];
    };
    /**
     * Format: double
     * @example 2024
     */
    Year: number;
    /**
     * Format: double
     * @example 1
     */
    Month: number;
    CreateCommentBody: {
      /** Format: double */
      epigramId: number;
      isPrivate: boolean;
      content: components['schemas']['CommentContent'];
    };
    UpdateCommentBody: {
      isPrivate?: boolean;
      content?: components['schemas']['CommentContent'];
    };
    /**
     * Format: email
     * @example example@email.com
     */
    Email: string;
    SignUpResponse: {
      refreshToken: string;
      accessToken: string;
      user: components['schemas']['User'] & {
        email: components['schemas']['Email'];
      };
    };
    /** @example password */
    Password: string;
    SignUpRequestBody: {
      image?: components['schemas']['UrlType'];
      passwordConfirmation: components['schemas']['Password'];
      password: components['schemas']['Password'];
      nickname: components['schemas']['Nickname'];
      email: components['schemas']['Email'];
    };
    SignInResponse: {
      refreshToken: string;
      accessToken: string;
      user: components['schemas']['User'] & {
        email: components['schemas']['Email'];
      };
    };
    SignInRequestBody: {
      password: components['schemas']['Password'];
      email: components['schemas']['Email'];
    };
    /** @description 간편 로그인 과정을 통해 발급받은 토큰입니다.<br />
     *
     *     * Google 의 경우에는 <b>Google Id 토큰</b>(JWT) 입니다.
     *     * Kakao 의 경우에는 <b>인가 코드</b> 입니다.
     *     * Naver 의 경우에는 <b>code</b> 입니다. */
    OauthToken: string;
    SignInWithOauthRequestBody: {
      /** @description Naver 의 경우에는 필수입니다.<br/>
       *     code를 얻을 때 사용하였던 state 값을 그대로 사용합니다. */
      state?: string;
      /**
       * @description Kakao 의 경우에는 필수입니다.<br/>
       *     인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
       * @example http://localhost:3000/oauth/kakao
       */
      redirectUri?: string;
      token: components['schemas']['OauthToken'];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  Me: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  UpdatePassword: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateUserBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
    };
  };
  RetrieveUser: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  ListComments: {
    parameters: {
      query: {
        limit: number;
        cursor?: number;
      };
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CursorBasedPaginationResponse_CommentType_'];
        };
      };
    };
  };
  UpsertOauthApp: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpsertOauthAppRequestBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['OauthApp'];
        };
      };
    };
  };
  ImageUpload: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': {
          /**
           * Format: binary
           * @description 이미지 파일, 최대 용량은 5MB입니다.
           */
          image: string;
        };
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            url: string;
          };
        };
      };
    };
  };
  ListEpigrams: {
    parameters: {
      query: {
        /** @description 페이지 당 에피그램 수 */
        limit: number;
        /** @description 페이지 커서 */
        cursor?: number;
        /** @description 검색 키워드 */
        keyword?: string;
        /** @description 작성자 ID 필터 */
        writerId?: number;
      };
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CursorBasedPaginationResponse_EpigramListType_'];
        };
      };
    };
  };
  CreateEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateEpigramBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramListType'];
        };
      };
    };
  };
  RetrieveTodayEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramDetailType'] | null;
        };
      };
    };
  };
  RetrieveEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramDetailType'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  DeleteEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** Format: double */
            id: number;
          };
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  UpdateEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateEpigramBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramListType'];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  LikeEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramDetailType'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  UnlikeEpigram: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpigramDetailType'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  ListEpigramComments: {
    parameters: {
      query: {
        limit: number;
        cursor?: number;
      };
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CursorBasedPaginationResponse_CommentType_'];
        };
      };
    };
  };
  GetTodayEmotionLog: {
    parameters: {
      query: {
        userId: components['schemas']['Id'];
      };
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EmotionLogType'] | null;
        };
      };
    };
  };
  UpsertEmotionLog: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpsertEmotionLogBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EmotionLogType'];
        };
      };
    };
  };
  GetMonthlyEmotionLog: {
    parameters: {
      query: {
        userId: components['schemas']['Id'];
        year: components['schemas']['Year'];
        month: components['schemas']['Month'];
      };
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EmotionLogType'][];
        };
      };
    };
  };
  CreateComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateCommentBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentType'];
        };
      };
    };
  };
  DeleteComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** Format: double */
            id: number;
          };
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  UpdateComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateCommentBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['CommentType'];
        };
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            message: string;
          };
        };
      };
    };
  };
  SignUp: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        /** @example {
         *       "email": "example@email.com",
         *       "nickname": "nickname",
         *       "password": "password",
         *       "passwordConfirmation": "password"
         *     } */
        'application/json': components['schemas']['SignUpRequestBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SignUpResponse'];
        };
      };
    };
  };
  SignIn: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        /** @example {
         *       "email": "example@email.com",
         *       "password": "password"
         *     } */
        'application/json': components['schemas']['SignInRequestBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SignInResponse'];
        };
      };
    };
  };
  RefreshToken: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          refreshToken: string;
        };
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            accessToken: string;
          };
        };
      };
    };
  };
  SignInWithOauth: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        teamId: string;
        provider: components['schemas']['OauthProvider'];
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['SignInWithOauthRequestBody'];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SignInResponse'];
        };
      };
    };
  };
}

export interface paths {
  '/{teamId}/users/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['Me'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['UpdatePassword'];
    trace?: never;
  };
  '/{teamId}/users/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['RetrieveUser'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/users/{id}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 유저의 댓글 목록 조회 */
    get: operations['ListComments'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/oauthApps': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 간편 로그인 App 등록/수정<br/>
     *     Google, Kakao, Naver 간편 로그인을 위한 App 을 등록하거나 수정합니다.<br/>
     *     이미 등록된 앱이 있을 경우 덮어씌워집니다.
     *
     *     ## Google
     *     * appKey: <b>"클라이언트 id"</b>
     *     * appSecret: 필요하지 않음
     *
     *     ---
     *
     *     ## Kakao
     *     * appKey: <b>"REST API 키"</b>
     *     * appSecret: 필요하지 않음
     *
     *     ---
     *
     *     ## Naver
     *     * appKey: <b>"Client ID"</b>
     *     * appSecret: <b>"Client Secret"</b>
     *
     *     ---
     *
     *     실습을 위해 발급받은 키를 등록해주세요. 실제 서비스에서 사용 하는 키를 등록해서는 안됩니다. */
    post: operations['UpsertOauthApp'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/images/upload': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 이미지 업로드,
     *     프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다. */
    post: operations['ImageUpload'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/epigrams': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 에피그램 목록 조회 */
    get: operations['ListEpigrams'];
    put?: never;
    /** @description 에피그램 작성 */
    post: operations['CreateEpigram'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/epigrams/today': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 오늘의 에피그램 조회 */
    get: operations['RetrieveTodayEpigram'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/epigrams/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 에피그램 상세 조회 */
    get: operations['RetrieveEpigram'];
    put?: never;
    post?: never;
    /** @description 에피그램 삭제 */
    delete: operations['DeleteEpigram'];
    options?: never;
    head?: never;
    /** @description 에피그램 수정 */
    patch: operations['UpdateEpigram'];
    trace?: never;
  };
  '/{teamId}/epigrams/{id}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 에피그램 좋아요 */
    post: operations['LikeEpigram'];
    /** @description 에피그램 좋아요 취소 */
    delete: operations['UnlikeEpigram'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/epigrams/{id}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 에피그램 댓글 목록 조회 */
    get: operations['ListEpigramComments'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/emotionLogs/today': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 오늘의 감정 조회 */
    get: operations['GetTodayEmotionLog'];
    put?: never;
    /** @description 오늘의 감정 저장 */
    post: operations['UpsertEmotionLog'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/emotionLogs/monthly': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 월별 감정 조회 */
    get: operations['GetMonthlyEmotionLog'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 댓글 목록 조회 */
    get: operations['ListComments'];
    put?: never;
    /** @description 댓글 작성 */
    post: operations['CreateComment'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/comments/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** @description 댓글 삭제 */
    delete: operations['DeleteComment'];
    options?: never;
    head?: never;
    /** @description 댓글 수정 */
    patch: operations['UpdateComment'];
    trace?: never;
  };
  '/{teamId}/auth/signUp': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 회원가입 */
    post: operations['SignUp'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/auth/signIn': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 로그인 */
    post: operations['SignIn'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/auth/refresh-token': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 토큰 갱신 */
    post: operations['RefreshToken'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{teamId}/auth/signIn/{provider}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 간편 로그인
     *
     *     가입되어있지 않을 경우엔 가입됩니다. */
    post: operations['SignInWithOauth'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
