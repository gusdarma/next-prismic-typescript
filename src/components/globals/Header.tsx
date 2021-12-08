import Head from "next/head";
import PrismicDom from "prismic-dom";

interface Header {
	title: string;
	description?: string;
}

export default function Seo({ title, description }: Header) {
	return (
		<div>
			{title && title}
			{description && description}
		</div>
	);
}
