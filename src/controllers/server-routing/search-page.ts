import { Request, Response } from "express";
import { butterService } from '../butterCMS.service';
import { GLOBAL_CONFIGS } from '../../configs/global-config';
import { STATUS_404 } from '../../constants';

export default function searchPageMiddleware(req: Request, res: Response) {
  const query = req.query.query;
  if (query !== undefined) {
    butterService.post.search(query, {
      page: 1,
      page_size: GLOBAL_CONFIGS.SEARCH_PAGE_CONFIGS.SEARCH_PAGE_SIZE
    }).then((data) => {
      res.locals.posts = data.data.data;
      return res.render('index', { req, res });
    }, (error) => {
      console.log(error);
      res.locals.status = STATUS_404;
      return res.render('index', { req, res });
    });
  } else {
    res.locals.posts = [];
    return res.render('index', { req, res });
  }
}