import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";

const mainMenu = async () => {
  const menu = await client().query(
    Prismic.Predicates.at("document.type", "main_menu")
  );
  if (menu) {
    return menu.results;
  }
  return "";
};

export default mainMenu;
