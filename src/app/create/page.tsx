import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategory } from "@/lib/actions/blog";
import CreateContentForm from "./components/CreateContentForm";

const page = async () => {
  const { data: categoryData } = await getCategory();
  console.log("category : ", categoryData);

  return (
    <section>
      <h1 className="text-2xl font-bold">글쓰기 페이지</h1>
      제목입력하고
      <br />
      카테고리 분류 셀렉트
      <br />그 밑에 글작성 왼쪽에 글작성 오른쪽에 마크다운 변환된거 보여주기
      제일 밑에 absolute로 글 임시저장, 출간하기
      {/* <h2 className="text-xl font-bold">카테고리</h2>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={data ? data[0].name_kr : "카테고리가 없습니다"}
            />
          </SelectTrigger>
          <SelectContent>
            {data?.map((el) => {
              return (
                <SelectItem key={el.id} value={el.id}>
                  {el.name_kr}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={data ? data[0].name_kr : "카테고리가 없습니다"}
            />
          </SelectTrigger>
          <SelectContent>
            {data?.map((el) => {
              return (
                <SelectItem key={el.id} value={el.id}>
                  {el.name_kr}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div> */}
      <CreateContentForm category={categoryData} />
    </section>
  );
};

export default page;
