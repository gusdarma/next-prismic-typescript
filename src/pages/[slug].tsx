import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";
import PrismicDom from "prismic-dom";
import Seo from "@/components/globals/Seo";
import Header from "@/components/globals/Header";
import isArchive from "@/lib/isArchive";

interface PageProps {
	page: Document;
	archive: any;
}

export default function Category({ page, archive }: PageProps) {
	const router = useRouter();

	console.log(archive, "ini archivenya");

	if (router.isFallback) {
		return <p>yuhu........</p>;
	}

	return (
		<>
			<Seo
				title={PrismicDom.RichText.asText(page.data.meta_title)}
				description={PrismicDom.RichText.asText(page.data.meta_description)}
			/>

			<div>
				<Header title={PrismicDom.RichText.asText(page.data.title)} />
				<h1 className="text-center text-4xl pt-10">
					{PrismicDom.RichText.asText(page.data.title)}
				</h1>
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await client().query([
		Prismic.Predicates.at("document.type", "page"),
	]);

	const paths = pages.results.map((page) => {
		return {
			params: { slug: page.uid },
		};
	});

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	const { slug } = context.params;
	const page = await client().getByUID("page", String(slug), {});

	const singleArchive = isArchive(String(slug));

	let archive;
	if (singleArchive) {
		archive = await client().query([
			Prismic.Predicates.at("document.type", String(slug)),
		]);
	}

	return {
		props: {
			page,
			archive: archive ? archive.results : ``,
		},
		revalidate: 60,
	};
};
