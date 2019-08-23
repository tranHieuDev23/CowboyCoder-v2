import { Request, Response } from "express"
import { butterService } from '../butterCMS.service';
import { STATUS_404 } from '../../constants';

export default function tagsListPageMiddleware(req: Request, res: Response) {
  butterService.tag.list()
    .then((data) => {
      res.locals.tags = data.data.data;
      return res.render('index', { req, res });
    }, (error) => {
      console.log(error);
      res.locals.status = STATUS_404;
      return res.render('index', { req, res });
    });
}