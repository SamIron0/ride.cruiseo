import React, { useEffect, useRef, useState } from 'react';
import { TbFridge } from 'react-icons/tb';
interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (arg: boolean) => void;
}
import { TiHeartOutline } from 'react-icons/ti';
import { IoSaveOutline } from 'react-icons/io5';
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <>
      <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto border-r rtl:border-l rtl:border-r-0 bg-black border-black">
        <nav className="flex flex-col flex-1 space-y-6">
          <a href="/">
            <img className="w-[37px] h-[37px]" src="/logo-2.svg" alt="" />
          </a>

          <a
            href="/dashboard"
            className="p-1.5 text-gray-200 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-zinc-800 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>

          <a
            href="/plans"
            className="p-1.5 focus:outline-nones flex justify-center  transition-colors duration-200 rounded-lg text-gray-200 hover:bg-zinc-800 "
          >
            <IoSaveOutline
              className="w-6 h-6 hover:text-gray-200 "
              color="white"
            />
          </a>

          <a
            href="/pantry"
            className="p-1.5 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg text-gray-200 hover:bg-zinc-800 "
          >
            <TbFridge className="w-6 h-6 hover:text-gray-200 " color="white" />
          </a>

          <a
            href="/preferences"
            className="p-1.5 text-gray-200 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-zinc-800 "
          >
            <TiHeartOutline
              className="w-6 h-6 hover:text-gray-200 "
              color="white"
            />
          </a>
        </nav>
        <div className="flex flex-col mb-12 sm:mb-0 space-y-6">
          <a
            href="#"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg text-gray-200 bg-zinc-800 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>

          <a className="flex justify-center " href="#">
            <img
              className="object-cover w-8 h-8 rounded-full"
              src="/user-01.png"
              alt=""
            />
          </a>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
