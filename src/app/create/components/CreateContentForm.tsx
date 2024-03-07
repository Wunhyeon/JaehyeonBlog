"use client";

import React, { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateContentFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { category } from "@/lib/types";
import { cn } from "@/lib/utils";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

const CreateContentForm = ({ category }: { category: category }) => {
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // select의 수
  const [selectCount, setSelectCount] = useState<number>(0);

  // 2차 분류
  const [secondCategory, setSecondCategory] = useState();

  // 3차 분류
  const [thirdCategory, setThirdCategory] = useState();

  const form = useForm<z.infer<typeof CreateContentFormSchema>>({
    mode: "all",
    resolver: zodResolver(CreateContentFormSchema),
    defaultValues: {
      title: "",
      content: "",
      contentCategoryId: "",
      mainImg: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CreateContentFormSchema>) => {
    startTransition(() => {});
  };

  // 1차 카테고리 변경시
  const changeFirstCategory = (e: any) => {
    console.log(e);
    console.log(typeof e);

    console.log("category : ", category);
  };

  useEffect(() => {
    if (category && category.length > 0) {
      setSelectCount(1);
    }
  }, []);

  const selectRows = [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          // title="username"
          name="contentCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                {/* <div className="flex gap-2">
                  <Select onValueChange={changeFirstCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          category ? category[0].name_kr : "카테고리가 없습니다"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {category?.map((el) => {
                        return (
                          <SelectItem key={el.id} value={el.id}>
                            {el.name_kr}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div> */}
                {/* <Select>
                  <SelectTrigger className="w-28">
                    <SelectValue
                      placeholder={
                        category && category.length > 0
                          ? category[0].name_kr
                          : "카테고리가 없습니다"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {category?.map((el) => {
                      return (
                        <SelectItem key={el.id} value={el.id}>
                          {el.name_kr}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select> */}
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x h-70vh"
                  )}
                >
                  <textarea
                    placeholder="content..."
                    {...field}
                    className={cn(
                      "border-none outline-purple-600 text-lg font-medium leading-relaxed resize-none",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "overflow-y-auto",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <MarkdownPreview content={form.getValues().content} />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateContentForm;
