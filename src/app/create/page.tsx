import React from "react";

const page = () => {
  return (
    <section className="w-5/6 mx-auto p-5">
      <h1 className="text-2xl font-bold">글쓰기 페이지</h1>
      제목입력하고
      <br />
      카테고리 분류 셀렉트
      <br />그 밑에 글작성 왼쪽에 글작성 오른쪽에 마크다운 변환된거 보여주기
      제일 밑에 absolute로 글 임시저장, 출간하기
    </section>
  );
};

export default page;
