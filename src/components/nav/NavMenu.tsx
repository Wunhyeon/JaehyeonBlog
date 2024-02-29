"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const NavMenu = () => {
  return (
    <Menubar className="flex-grow">
      <MenubarMenu>
        <MenubarTrigger>About</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/about/selfIntroduction">자기소개</Link>
            {/* New Tab <MenubarShortcut>⌘T</MenubarShortcut> */}
          </MenubarItem>
          <MenubarItem>포트폴리오</MenubarItem>
          {/* <MenubarSeparator /> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Contents</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>공지사항</MenubarItem>
          <MenubarItem>
            개발<MenubarShortcut>🧑‍💻</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            뉴스
            <MenubarShortcut>📰</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            게시판
            <MenubarShortcut>📝</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {" "}
          <Link href="#">Contact</Link>
        </MenubarTrigger>
        {/* About */}
      </MenubarMenu>
    </Menubar>
  );
};

export default NavMenu;
