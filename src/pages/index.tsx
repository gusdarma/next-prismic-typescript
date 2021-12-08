import { GetStaticProps } from "next";
import { client } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";
import PrismicDom from "prismic-dom";
import Seo from "@/components/globals/Seo";

export default function Home({ home }) {
	console.log(home, "ini homes");
	return (
		<>
			<Seo
				title={PrismicDom.RichText.asText(home.data.meta_title)}
				description={PrismicDom.RichText.asText(home.data.meta_description)}
			/>
			<div>
				<h1 className="text-center text-4xl pt-10">
					{PrismicDom.RichText.asText(home.data.title)}
				</h1>
			</div>
		</>
	);
}

interface HomeProps {
	home: Document;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const home = await client().getByUID("page", "home", {});

	console.log(home, "ini homenya");

	return {
		props: {
			home: home,
		},
		revalidate: 60,
	};
};
