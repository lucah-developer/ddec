function upsert(selector, create, apply) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

export function setSeo({ title, description, path }) {
  const url = `${window.location.origin}${path}`;
  document.title = title;
  upsert('meta[name="description"]', () => {
    const el = document.createElement("meta");
    el.setAttribute("name", "description");
    return el;
  }, (el) => el.setAttribute("content", description));
  upsert('link[rel="canonical"]', () => {
    const el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    return el;
  }, (el) => el.setAttribute("href", url));
  const og = {
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:type": "website",
    "og:locale": "es_AR",
    "og:site_name": "D.D.E.C. S.R.L.",
  };
  Object.entries(og).forEach(([property, content]) => {
    upsert(`meta[property="${property}"]`, () => {
      const el = document.createElement("meta");
      el.setAttribute("property", property);
      return el;
    }, (el) => el.setAttribute("content", content));
  });
  const ld = document.getElementById("seo-ld");
  if (ld) {
    try {
      const data = JSON.parse(ld.textContent);
      data.url = window.location.origin + "/";
      ld.textContent = JSON.stringify(data);
    } catch (e) {
      /* el bloque estático sigue siendo válido */
    }
  }
}
