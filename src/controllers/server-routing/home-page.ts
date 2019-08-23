import { Request, Response } from 'express';
import { butterService } from '../butterCMS.service';
import { GLOBAL_CONFIGS } from '../../configs/global-config';
import { Post } from 'src/models/post';
import { Category } from 'src/models/category';
import { STATUS_404 } from '../../constants';

export default function homePageMiddleware(req: Request, res: Response) {
  const postsPromise = butterService.post.list({
    page: 1,
    page_size: GLOBAL_CONFIGS.HOME_PAGE_CONFIGS.MAX_LATEST_POSTS,
    exclude_body: true
  });
  const categoryPromise = butterService.category.list();

  Promise.all([postsPromise, categoryPromise]).then((result) => {
    const latestPosts: Post[] = result[0].data.data;
    const categories: Category[] = result[1].data.data;
    const categoryLatestPromises = Array(categories.length);
    categories.forEach((item, index) => {
      categoryLatestPromises[index] = butterService.post.list({
        category_slug: item.slug,
        page: 1,
        page_size: GLOBAL_CONFIGS.HOME_PAGE_CONFIGS.MAX_CATEGORY_LATEST_POSTS,
        exclude_body: true
      });
    });

    Promise.all(categoryLatestPromises)
      .then((result: any[]) => {
        const categoryLatestPosts: Post[][] = result.map((item) => item.data.data);
        res.locals.latestPosts = latestPosts;
        res.locals.categories = categories;
        res.locals.categoryLatestPosts = categoryLatestPosts;
        return res.render('index', { req, res });
      }, () => {
        res.locals.status = STATUS_404;
        return res.render('index', { req, res });
      });
  }, (error) => {
    console.log(error);
    res.locals.status = STATUS_404;
    return res.render('index', { req, res });
  });
}