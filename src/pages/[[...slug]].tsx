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
import isDefaultLang from "@/lib/isDefaultLang";
import linkResolver from "@/lib/linkResolver";

interface PageProps {
  document: Document;
  archive: any;
}

export default function Category({ document, archive }: PageProps) {
  const router = useRouter();

  console.log(document, "ini documentnya");
  console.log(archive, "ini archive");

  if (router.isFallback) {
    return <p>yuhu........</p>;
  }

  return (
    <>
      <Seo
        title={PrismicDom.RichText.asText(document.data.meta_title)}
        description={PrismicDom.RichText.asText(document.data.meta_description)}
      />

      <div>
        <Header
          title={PrismicDom.RichText.asText(document.data.title)}
          altLang={document.alternate_languages}
        />
        <h1 className="pt-10 text-4xl text-center">
          {PrismicDom.RichText.asText(document.data.title)}
        </h1>
      </div>
      {archive ? (
        <div className="pt-20 text-center">
          <div className="">
            <p className="">List Child:</p>
          </div>
          {archive.map((child: any, i: number) => (
            <div className="" key={i}>
              <Link href={linkResolver(child)}>
                <a className="underline">
                  {child.data.title &&
                    PrismicDom.RichText.asText(child.data.title)}
                </a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tempPages = await client().query(
    Prismic.Predicates.at("document.type", "page"),
    { lang: `*` }
  );
  const tempBlogs = await client().query(
    Prismic.Predicates.at("document.type", "blog"),
    { lang: `*` }
  );
  const pages = tempPages.results;
  const blogs = tempBlogs.results;
  const frontPage = "home";
  const allDocs = pages.concat(blogs);

  const paths = allDocs.map((page) => {
    const tempDefault = isDefaultLang(page.lang);

    let tempSlug: any[];
    if (!tempDefault) {
      if (page.uid == frontPage) {
        tempSlug = [page.lang];
      } else {
        tempSlug = [page.lang, page.uid];
      }
      if (isArchive(page.type)) {
        tempSlug = [page.lang, page.type, page.uid];
      }
    } else {
      tempSlug = [page.uid];
      if (page.uid == frontPage) {
        tempSlug = [];
      }
      if (isArchive(page.type)) {
        tempSlug = [page.type, page.uid];
      }
    }
    console.log(tempSlug, "==");

    return {
      params: { slug: tempSlug, lang: page.lang, type: page.type },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  console.log(context, "ini context di lug");

  const translateLang = "fr-fr";
  const defaultLang = "en-us";
  const { slug } = context.params;
  let finalType, finalUid, finalLang, checkIsArchive;

  if (slug) {
    if (translateLang == slug[0]) {
      finalLang = translateLang;
      if (slug.length == 1) {
        finalType = "page";
        finalUid = "home";
      } else if (slug.length > 2) {
        finalType = String(slug[1]);
        finalUid = String(slug[2]);
      } else {
        finalType = "page";
        finalUid = String(slug[1]);
        checkIsArchive = isArchive(String(slug[1]));
      }
    } else {
      finalLang = defaultLang;
      if (slug.length == 0) {
        finalType = "page";
        finalUid = "home";
      }
      if (slug.length == 1) {
        finalType = "page";
        finalUid = String(slug[0]);
        checkIsArchive = isArchive(String(slug[0]));
      } else {
        finalType = String(slug[0]);
        finalUid = String(slug[1]);
      }
    }
  } else {
    finalType = "page";
    finalUid = "home";
    finalLang = defaultLang;
  }

  console.log(finalType, " - ", finalUid, " - ", finalLang);

  const document = await client().getByUID(finalType, finalUid, {
    lang: finalLang,
  });

  let archive;
  if (checkIsArchive) {
    archive = await client().query(
      Prismic.Predicates.at("document.type", checkIsArchive),
      { lang: finalLang }
    );
  }

  return {
    props: {
      document,
      archive: archive ? archive.results : ``,
    },
    revalidate: 1,
  };
};
