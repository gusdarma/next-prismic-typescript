const linkResolver = (doc: any) => {
  const defaultLang = "en-us";
  const translateLang = "fr-fr";

  if (defaultLang == doc.lang) {
    if (doc.type === "page") return `/${doc.uid}`;
    if (doc.type === "blog") return `/${doc.type}/${doc.uid}`;
  } else {
    if (doc.type === "page") return `/${translateLang}/${doc.uid}`;
    if (doc.type === "blog") return `/${translateLang}/${doc.type}/${doc.uid}`;
  }
  return "/";
};

export default linkResolver;
