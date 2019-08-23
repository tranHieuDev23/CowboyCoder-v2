import { Request, Response } from "express";
import { butterService } from "../butterCMS.service";

export default function aboutPageMiddleware(req: Request, res: Response) {
  butterService.author.list()
    .then((data) => {
      res.locals.authors = data.data.data;
      return res.render('index', { req, res });
    }, (error) => {
      console.log(error);
      return res.render('index', { req, res });
    });
}