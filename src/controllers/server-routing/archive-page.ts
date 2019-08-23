import { Request, Response } from "express";
import { butterService } from '../butterCMS.service';
import { GLOBAL_CONFIGS } from '../../configs/global-config';
import { STATUS_404 } from '../../constants';

export default function archiveMiddleware(req: Request, res: Response) {
  const type = req.params.type;
  if (type != 'category' && type != 'tag' && type != 'author') {
    return res.render('index', { req, res, url: '/error' });
  }
  const slug = req.params.slug;
  const currentPage = (req.params.page !== undefined ? +req.params.page : 1);
  const REQUEST_PARAMS: any = {
    page: currentPage,
    page_size: GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_SIZE,
    exclude_body: true
  };
  if (type == 'category')
    REQUEST_PARAMS.category_slug = slug;
  if (type == 'tag')
    REQUEST_PARAMS.tag_slug = slug;
  if (type == 'author')
    REQUEST_PARAMS.author_slug = slug;

  const metaPromise = butterService[type].retrieve(slug);
  const postsPromise = butterService.post.list(REQUEST_PARAMS);

  Promise.all([metaPromise, postsPromise]).then((result) => {
    res.locals.type = type;
    res.locals.slug = slug;
    res.locals.currentPage = currentPage;
    res.locals.meta = result[0].data;
    res.locals.posts = result[1].data;
    return res.render('index', { req, res });
  }, (error) => {
    console.log(error);
    res.locals.status = STATUS_404;
    return res.render('index', { req, res });
  })
}