import Head from "next/head";
import PrismicDom from "prismic-dom";
import React from "react";
import linkResolver from "../../lib/linkResolver";
import Link from "next/link";
interface Header {
  title: string;
  description?: string;
  altLang: any;
}

export default function Header({ title, description, altLang }: Header) {
  const [switcher, setSwitcher] = React.useState(false);

  const currentAltLang = altLang[0];

  return (
    <div>
      <div className="p-10">
        <div className="relative inline-block dropdown">
          <button
            onClick={() => setSwitcher(!switcher)}
            className="inline-flex items-center px-4 py-2 font-semibold text-gray-700"
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
            <li className="yuhu">
              <Link href={linkResolver(currentAltLang)}>
                <a className="block w-full px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-b hover:bg-gray-400">
                  {currentAltLang.lang}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
