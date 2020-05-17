import { PageMeta } from "~/types";

export const getHead = (pageMeta: PageMeta) => {
  return {
    title: pageMeta.title,
    meta: [
      { hid: 'description', name: 'description', content: pageMeta.description },
      // Open Graph
      { name: 'og:title', content: pageMeta.title },
      { name: 'og:description', content: pageMeta.description },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: pageMeta.url },
      { name: 'og:image', content: pageMeta.image.src },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@whereistango' },
      { name: 'twitter:title', content: pageMeta.title },
      { name: 'twitter:description', content: pageMeta.description },
      { name: 'twitter:image', content: pageMeta.image.src },
      { name: 'twitter:image:alt', content: pageMeta.image.alt },

      // Google / Schema.org markup:
      { itemprop: 'name', content: pageMeta.title },
      { itemprop: 'description', content: pageMeta.description },
      { itemprop: 'image', content: pageMeta.image.src }
    ]
  }
}