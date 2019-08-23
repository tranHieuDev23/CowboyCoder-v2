import { Request, Response } from "express"
import { butterService } from '../butterCMS.service';
import { STATUS_404 } from '../../constants';

export default function postPageMiddleware(req: Request, res: Response) {
  butterService.post.retrieve(req.params.slug)
    .then((data) => {
      res.locals.data = data.data;
      return res.render('index', { req, res });
    }, (error) => {
      console.log(error);
      res.locals.status = STATUS_404;
      return res.render('index', { req, res });
    })
}