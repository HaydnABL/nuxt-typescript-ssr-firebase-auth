import express,{ Request, Response, Router } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib'

const service = '/sitemap.xml';

const staticRoutes = [
  '/',
  '/terms',
  '/privacy-policy',
  '/register',
  '/login',
  '/crop',
  '/lightbox'
]

const app = express();
const router = Router();

let sitemap: Buffer | null = null;

router.get(service, (req: Request, res: Response) => {
  console.log(req.originalUrl, ' called (get)');
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://nuxt-ts-firebase-auth-ssr.web.app/' })
    const pipeline = smStream.pipe(createGzip())

    staticRoutes.forEach((route) => smStream.write({ url: route, changefreq: 'weekly', priority: 0.8 }))
    smStream.end()

    // cache the response
    streamToPromise(pipeline).then((sm: Buffer) => sitemap = sm).catch((error:Error) => console.log(error))
    // stream write the response
    pipeline.pipe(res).on('error', (e: Error) => {
      throw e
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
});

app.use(router)

export default {
  handler: app
}