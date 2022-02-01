import Head from "next/head";
import PrismicDom from "prismic-dom";
import React from "react";
import linkResolver from "@/lib/linkResolver";
import Link from "next/link";

interface Header {
  title?: string;
  description?: string;
  altLang?: any;
  mainMenu?: any;
}

export default function Header({
  title,
  description,
  altLang,
  mainMenu,
}: Header) {
  const [switcher, setSwitcher] = React.useState(false);

  console.log(mainMenu, "ini main menu nya di child");

  return (
    <div>
      <div className="container grid grid-cols-3">
        <div className="col-span-1"></div>
        <div className="flex justify-end col-span-2">
          <div className="">
            <ul className="flex space-x-12">
              {mainMenu
                ? mainMenu.all_menu.map((menu: any, i: number) => (
                    <li className="" key={i}>
                      <Link href={linkResolver(menu.menu)}>
                        <a className="">
                          {PrismicDom.RichText.asText(menu.label)}
                        </a>
                      </Link>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="pl-12">
            <div className="relative inline-block dropdown">
              <button
                onClick={() => setSwitcher(!switcher)}
                className="inline-flex items-center font-semibold text-gray-700"
              >
                <span className="mr-1">Language</span>
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul
                className={`absolute pt-1 text-gray-700 dropdown-menu w-full ${
                  switcher ? "block" : "hidden"
                }`}
              >
                {altLang.map((lang: any, i: number) => (
                  <li className="yuhu" key={i}>
                    <Link href={linkResolver(lang)}>
                      <a className="block w-full whitespace-no-wrap bg-gray-200 rounded-b hover:bg-gray-400">
                        {lang.lang}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
