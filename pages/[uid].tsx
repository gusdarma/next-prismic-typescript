import React from "react";

const Prismic = require("@prismicio/client");
// Update the path for your API client file.
import { Client } from "../utils/prismicHelpers";
import { RichText } from "prismic-reactjs";

// Update the paths for your functions and component files.
// import SliceZone from "../path-to-your-slicezone-component";

const Post = () => {
	return (
		<>
			{/* {RichText.asText(post.data.title)} */}
			{/* <SliceZone sliceZone={post.data.body} /> */}
			<p className="">yuhuasik</p>
		</>
	);
};

export async function getStaticProps({ params, previewData }: any) {
	console.log(params, "ini paramsnya");

	const post = await Client().getByUID("blog", params.uid, {
		...(previewData as {}),
	});

	console.log(post, "yuhu ini postnya");

	return {
		props: {
			post,
		},
	};
}

export async function getStaticPaths() {
	const docs = await Client().query(
		Prismic.Predicates.at("document.type", "blog"),
		{ lang: "*" }
	);

	docs.results.map((doc) => {
		console.log(doc, "all");
	});

	return {
		paths: docs.results.map((doc) => {
			return { params: { uid: doc.uid } };
		}),
		fallback: true,
	};
}

export default Post;
