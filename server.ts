/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import express from 'express';
import { join } from 'path';

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require('./dist/server/main');

import { butterService } from './src/controllers/butterCMS.service';

app.get('/sitemap.xml', (req, res) => {
  butterService.feed.retrieve('sitemap')
    .then((result) => {
      res.set('Content-Type', 'text/xml')
      res.end(result.data.data)
    }, (error) => {
      console.log(error);
      res.status(404).end('Nothing. There is no sitemap.')
    })
});

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

import aboutPageMiddleware from './src/controllers/server-routing/about-page';
import archiveMiddleware from './src/controllers/server-routing/archive-page';
import postPageMiddleware from './src/controllers/server-routing/post-page';
import searchPageMiddleware from './src/controllers/server-routing/search-page';
import tagsListPageMiddleware from './src/controllers/server-routing/tags-list-page';
import homePageMiddleware from './src/controllers/server-routing/home-page';

app.get('/about', aboutPageMiddleware);
app.get('/archive/:type/:slug', archiveMiddleware);
app.get('/archive/:type/:slug/:page', archiveMiddleware);
app.get('/post/:slug', postPageMiddleware);
app.get('/search', searchPageMiddleware);
app.get('/tags-list', tagsListPageMiddleware);
app.get('/', homePageMiddleware);

app.get('*', (req, res) => {
  res.status(404).render('index', { req, res });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
