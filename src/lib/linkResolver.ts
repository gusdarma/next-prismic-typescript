const linkResolver = (doc: any) => {
  const defaultLang = "en-us";
  const translateLang = "fr-fr";

  if (defaultLang == doc.lang) {
    if (doc.type === "page" && doc.uid === "home") return `/`;
    if (doc.type === "page" && doc.uid !== "home") return `/${doc.uid}`;
    if (doc.type === "blog") return `/${doc.type}/${doc.uid}`;
  } else {
    if (doc.type === "page" && doc.uid === "home") return `/${translateLang}`;
    if (doc.type === "page" && doc.uid !== "home")
      return `/${translateLang}/${doc.uid}`;
    if (doc.type === "page") return `/${translateLang}/${doc.uid}`;
    if (doc.type === "blog") return `/${translateLang}/${doc.type}/${doc.uid}`;
  }
  return "/";
};

export default linkResolver;
