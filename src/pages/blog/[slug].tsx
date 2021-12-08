import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDom from "prismic-dom";
import Seo from "@/components/globals/Seo";

interface BlogProps {
	blog: Document;
}

export default function Category({ blog }: BlogProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <p>yuhu........</p>;
	}

	return (
		<>
			<Seo
				title={PrismicDom.RichText.asText(blog.data.meta_title)}
				description={PrismicDom.RichText.asText(blog.data.meta_description)}
			/>
			<div>
				<h1 className="text-center text-4xl pt-10">
					{PrismicDom.RichText.asText(blog.data.title)}
				</h1>
			</div>
		</>
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

	const blogs = await client().query([
		Prismic.Predicates.at("document.type", "blog"),
	]);

	return {
		props: {
			blog,
			blogs: blogs.results,
		},
		revalidate: 60,
	};
};
