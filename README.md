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
