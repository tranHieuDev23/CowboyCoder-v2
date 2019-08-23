import { Author } from "./author";
import { Category } from "./category";
import { Tag } from "./tag";

export class Post {
  constructor(
    public readonly slug: string,
    public readonly url: string,
    public readonly published: Date,
    public readonly created: string,
    public readonly status: string,
    public readonly title: string,
    public readonly body: string,
    public readonly summary: string,
    public readonly seo_title: string,
    public readonly meta_description: string,
    public readonly author: Author,
    public readonly categories: Category[],
    public readonly tags: Tag[],
    public readonly featured_image: string
  ) { }
}