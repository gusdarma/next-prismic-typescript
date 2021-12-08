import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";
import PrismicDom from "prismic-dom";

interface PageProps {
	page: Document;
}

export default function Category({ page }: PageProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <p>yuhu........</p>;
	}

	return (
		<div>
			{/* <h1>{PrismicDom.RichText.asText(blog.data.title)}</h1> */}
			<h1 className="pb-2 bg-black">yuhu ini Page</h1>
			<h1 className="asik">yuhu ini asik</h1>
			<Link href="/contact">
				<a href="" className="">
					click aku
				</a>
			</Link>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await client().query([
		Prismic.Predicates.at("document.type", "page"),
	]);

	// console.log(pages, "ini pagesnya");

	const paths = pages.results.map((page) => {
		return {
			params: { slug: page.uid },
		};
	});

	console.log(paths, "ini pathsnya");

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
	const { slug } = context.params;

	const page = await client().getByUID("page", String(slug), {});

	const products = await client().query([
		Prismic.Predicates.at("document.type", "page"),
	]);

	return {
		props: {
			page,
			products: products.results,
		},
		revalidate: 60,
	};
};
