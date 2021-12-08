import Head from "next/head";

interface SEOProps {
	title: string;
	description?: string;
	image?: string;
	shouldExcludeTitleSuffix?: boolean;
	shouldIndexPage?: boolean;
}

export default function Seo({
	title,
	description,
	image,
	shouldExcludeTitleSuffix = false,
	shouldIndexPage = true,
}: SEOProps) {
	const pageTitle = `${title}`;

	return (
		<Head>
			<title>{pageTitle}</title>

			{description && <meta name="description" content={description} />}

			{!shouldIndexPage && <meta name="robots" content="noindex, nofollow" />}
		</Head>
	);
}
