export class Author {
  constructor(
    public readonly slug: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly bio: string,
    public readonly title: string,
    public readonly linkedin_url: string,
    public readonly facebook_url: string,
    public readonly pinterest_url: string,
    public readonly instagram_url: string,
    public readonly twitter_handle: string,
    public readonly profile_image: string
  ) { }
}