# 임재현 블로그

## 기술스택

- Next.JS
- SUPABASE
- ShadCN
- 쓸만한거 있으면 계속 추가중

## DB - SUPABASE

SUPABASE 기본세팅은 VERCEL 깃헙의 example/with-supabase 에 들어가보면 쉽게 알 수 있다.

https://supabase.com/docs/guides/auth/server-side/nextjs
여기에 들어가봐도 로그인에 관한 설명이 잘 되어있다.

### SUPABASE 기본세팅

```
src/middleware.ts
src/utils/supabase/client.ts
src/utils/supabase/middleware.ts
src/utils/supabase/server.ts
src/app/auth/callback/route.ts
```

Google Login (OAuth Login)은 이 동영상 참조하면 좋다.
https://www.youtube.com/watch?v=7aYgxQ6QAjs

[공식문서](https://supabase.com/docs/guides/auth/auth-deep-dive/auth-google-oauth)는 이건데, 봐도 잘 모르겠음. 위 동영상이 더 좋다.

### DB type 잘못 만들었을 때 (특히 ID를 uuid로 해야되는데, int로 만들었다던가)

https://stackoverflow.com/questions/20342717/postgresql-change-column-type-from-int-to-uuid
여기를 참조하면 좋다.
가장 좋은 방법은,

1. uuid로 된 칼럼을 하나 추가 (프라이머리 키), 기존 ID의 프라이머리 키를 제거
2. 1에서 만든 uuid로 된 칼럼에 프라이머리 키 속성 추가해주기.

## DB내에 자체적으로 로그 테이블을 만들어주려면 이 방법이 괜찮을 것 같다.

https://github.com/prisma/prisma/discussions/12610

### OAuth에서 SignUp하면 Public User Table로 유저 자동으로 생성하는 법 (Trigger)

https://youtu.be/4A4KFdanCb4?si=5PWAdZSb312Qdlu5
OAuth에서 SignUp 하면 auth Schema의 auth.user 테이블에 유저 데이터가 생기면서 가입이 되는데, auth 데이터베이스는 접근이 되지 않는다.
따라서 auth.user 테이블에 데이터 로우가 들어갈 시 자동으로 public.user테이블에 데이터를 넣는 trigger function을 만들어준다.

1. 당연하지만, public.user 테이블을 만들어줘야한다.
2. supabase dashboard -> project -> Database -> functions 로 이동.
3. function create
4.

```sql
BEGIN
  INSERT INTO public.user(id, email,  name, user_img)
  VALUES (
    new.id, -- 이번에 새로 signUp을 해서 auth.user에 만들어진 ID
    new.raw_user_meta_data ->> 'email',  -- new.raw_user_meta_data는 JSON 형식인데, 이 raw_user_meta_data라는 JSON 칼럼에서 email 이라는 속성을 찾아서 그 값을 뽑는다.
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
END
```

5. Show advanced settings 체크, Security Definer 선택. confirm -> Function 만들어짐.
6. Triggers 탭으로 이동. 이동해도 auth Schema의 Trigger를 만들수는 없다.
7. SQL Editor로 이동. 다음 구문을 실행시켜준다.

```sql
CREATE trigger create_user_on_oauth_signup_to_public_user -- (create_user_on_oauth_signup_to_public_user는 이번에 만드는 트리거의 이름이다. 좀 길게 만든듯)
AFTER insert ON auth.users FOR EACH ROW -- INSERT 후에 이 트리거를 실행시킨다는 말이다. 그러니깐 auth.user테이블에 유저가 들어가고 난 후 (sign up 후에 실행된다는 얘기)
-- ON 으로 테이블을 지정해줬다. auth.user테이블, for each row : 각각의 로우 하나씩마다 들어갈때
EXECUTE FUNCTION create_user_on_signup (); -- 4에서 만들어줬던 펑션을 실행시켜준다. (나는 create_user_on_signup라고 펑션 이름을 지어줬기에 이렇게 쓴것이다.)
```

8. 다시 database -> triggers 탭으로 들어간뒤 schema를 auth로 바꿔보면, trigger가 생성된 것을 볼 수 있다.

http://localhost:3000/auth/auth-code-error#error=server_error&error_code=500&error_description=Database+error+saving+new+user

++ 내경우 위처럼 해줘도 에러가 발생했었는데,
그 이유는 나는 user Table안에 user의 역할을 지정하는 role_id (role table의 foreign key)라는 값을 필수로 받아주게끔 만들어놨었기 때문이다.
그래서, role 테이블에 값을 넣고, 4에서 만들어줬던 function을 약간 수정해줬다.

```sql
BEGIN
  INSERT INTO public.user(id, email,  name, user_img, role_id)  -- role_id를 추가해줬다.
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'email',
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'avatar_url',
    '53e71733-de50-4610-971a-1ce901b1de60' -- Role테이블에서 일반유저 role의 id이다. postgreSQL에서는 '와 "의 차이도 있기 때문에, 주의하도록한다. 여기서는 '를 써주도록 한다.
  );
  return new;
END
```

### 자동저장기능을 구현하려면 Debouncer 펑션을 필수로 넣어줘야 할 듯.

- https://www.freecodecamp.org/korean/news/debounce-dibaunseu-javascripteseo-hamsureul-jiyeonsikineun-bangbeob-js-es6-yeje/

디바운서, 쓰로틀링

- https://velog.io/@jiynn_12/Debounce-%EC%99%80-throttle-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90

### supabase에서 transaction기능 구현은 아직인듯 함.

rpc기능을 사용해서 만들어봤다.

1. 먼저 function을 만들어 준다.
2. 이건 3wordIdea 만들 때의 예시다.

function의 argument
idea_title : text,
idea_description : text,
idea_is_visible : boolean,
words : text[],
profile_id : uuid DEFAULT NULL::uuid

definition

```sql
DECLARE i_id uuid;      -- i_id라는 변수 선언.
BEGIN
    -- Insert a new post into the "ideas" table
    INSERT INTO ideas (title, description, is_visible, profile_id)
    VALUES (idea_title, idea_description, idea_is_visible, profile_id)
    RETURNING id INTO i_id;
    -- ideas table에 INSERT 후, id를 반환받고, 이를 i_id 변수에 넣는다.

    -- Insert a new comment into the "words_ideas" table
    INSERT INTO words_ideas (words_id, ideas_id)
    VALUES (UNNEST(words), i_id);
    -- UNNEST는 배열을 풀어서 각각 넣어준다.
    -- 그러니깐 words_idea(['banana','apple','straw_berry'],'id1');
    -- 이렇게 함수가 실행된다고 한다면,

    words_idea_id  | words_id | ideas_id
    words_idea_id1 | banana   | id1
    words_idea_id2 | apple    | id1
    words_idea_id3 | straw_berry | id1

    -- 이런식으로 들어가게 되는 것이다.
END;

```

3. 함수를 만들어 준 후 사용할 때는

```ts
export const insertWordAndIdea = async (
  idea: { title: string; description: string; isVisible: boolean },
  words: string[]
) => {
  const supabase = getDB();
  const user = await getUser();
  // idea 저장
  const data = await supabase.rpc("insert_word_idea_after_insert_idea", {
    idea_title: idea.title,
    idea_description: idea.description,
    idea_is_visible: user && !idea.isVisible ? false : true,
    words: words,
    profile_id: user?.id,
  });

  return data;
  // 변경. 원래는 title에 들어가있는 단어들만 넣어주려 했으나, 그냥 단어 전부 넣는걸로 변경
};
```

이런식으로 사용해주면 된다.

## Typescript Type Generate 하기

https://supabase.com/docs/guides/api/rest/generating-types

예시

```
npx supabase gen types typescript --project-id "csvpuk124bqwziozqghoid" --schema public > src/lib/types/supabase.ts
```

(먼저 lib/types 등의 디렉토리를 만들어줘야 한다.)

여기서 project-id는 supabase dashboard -> project -> Project Settings(톱니바퀴)에 있는 Reference ID이다.
그런 뒤에 기존에 만들어져있던 client를 만드는 파일들 (utils/supabase/client.ts, utils/supabase/server.ts, utils/supabase/middleware.ts)에서
`createBrowserClient(supabase ID)`이렇게 되어있던 부분을 `createBrowserClient<Database>(supabase ID)`이렇게 고쳐주면, 자동완성도 되고 참 좋다.

## Supabase IS NULL 사용

https://supabase.com/docs/reference/javascript/is
카테고리에 parents id칼럼을 주고, 순차적으로 내려받으려고 했는데, eq함수로는 안되서 찾아보니 is()라는 메서드를 사용해야 했다.

## ZOD의 optional, nullable, nullish에 대해서.

https://gist.github.com/ciiqr/ee19e9ff3bb603f8c42b00f5ad8c551e

```ts
// zod schema
z.object({
    // valid if string or:
    optional: z.string().optional(), // field not provided, or explicitly `undefined`
    nullable: z.string().nullable(), // field explicitly `null`
    nullish: z.string().nullish(), // field not provided, explicitly `null`, or explicitly `undefined`
});

// type
{
    optional?: string | undefined;
    nullable: string | null;
    nullish?: string | null | undefined;
}
```

## ShadCN - Form - Select

```tsx
<Select onValueChange={field.onChange} value={field.value}>
```

https://github.com/shadcn-ui/ui/issues/549#issuecomment-1656482636

## 카테고리.

자식이 있는 카테고리를 선택하면, 그 옆으로 바로 자식들이 있는 셀렉트 박스가 생기고, 여기서 또 자식있는 거 선택하면 옆에 셀렉트박스 생기고. 없으면 안생기고. 선택 안하면 선택한거까지만 select하고.
도움 될만한 거 : https://github.com/JedWatson/react-select/issues/4229

cascading drop down select
https://www.youtube.com/watch?v=-S6zEpqnhSI

재귀를 이용한 카테고리 분류
https://stackoverflow.com/questions/55122059/how-to-dynamically-generate-dropdown-from-nested-array-in-reactjs
https://codesandbox.io/p/sandbox/rln82loyj4?file=%2Fsrc%2Findex.js%3A23%2C27&fontsize=14
https://hackids.tistory.com/135

Select만드는 데 도움이 될지는 모르겠지만..
https://dev.to/keyurparalkar/recursive-elements-in-react-3jp1
