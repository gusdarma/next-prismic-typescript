import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";
import PrismicDom from "prismic-dom";

interface BlogProps {
	blog: Document;
}

export default function Category({ blog }: BlogProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <p>yuhu........</p>;
	}

	return (
		<div>
			{/* <h1>{PrismicDom.RichText.asText(blog.data.title)}</h1> */}
			<h1 className="">yuhu</h1>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const blogs = await client().query([
		Prismic.Predicates.at("document.type", "blog"),
	]);

	// console.log(blogs, "ini blogsnya");

	const paths = blogs.results.map((blog) => {
		return {
			params: { slug: blog.uid },
		};
	});

	console.log(paths, "ini pathsnya");

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
	const { slug } = context.params;

	const blog = await client().getByUID("blog", String(slug), {});

	const products = await client().query([
		Prismic.Predicates.at("document.type", "blog"),
	]);

	return {
		props: {
			blog,
			products: products.results,
		},
		revalidate: 60,
	};
};
