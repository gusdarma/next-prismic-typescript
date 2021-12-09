import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";

const allDocuments = async (type: string) => {
	const pages = await client().query(
		Prismic.Predicates.at("document.type", type),
		{ lang: `*` }
	);
	if (pages) {
		return pages.results;
	}
	return "";
};

export default allDocuments;
