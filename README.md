<h1 style="text-align: center;">Cowboy Coder - v2</h1>
<p style="text-align: center;">A simple and customizable ButterCMS theme, made with Angular 8</p>

## Table of contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Config](#config)
- [License](#license)

<a name="description"></a>

## Description

This project utilizes [ButterCMS](https://buttercms.com/) - a headless CMS providing a RESTful API for content management, allowing developers to focus only on designing the look.

Like and comment features use [Facebook Social Plugin](https://developers.facebook.com/docs/plugins/), allowing visitors to like and comment using their Facebook accounts. The Facebook Javascript SDK script, however, has not been included yet. To use these features, you will have to add the script with your Facebook app's ID into `src/index.html` by yourself.

This project includes an [Angular 8](https://angular.io) front end and an [Express](https://expressjs.com) server for server-side rendering with Angular Universal.

<a name="installation"></a>

## Installation

```bash
git clone https://github.com/tranHieuDev23/CowboyCoder-v2.git
cd CowboyCoder-v2
npm install
```

<a name="usage"></a>

## Usage

- To build or serve the Angular 8 client: use the default Angular CLI commands `ng build` and `ng serve`.
- To build or serve the project with server-side rendering: `npm run build:ssr` and `npm run serve:ssr`.
- To build and serve the project immediately: `npm start`.

<a name="config"></a>

## Config

### `src/configs/global-config.ts`

Here you can find the many configurations relating to the blog's content:

<table>
  <tr>
    <th>Group</th>
    <th>Value</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td rowspan="7"><code>GENERAL_CONFIGS</code></td>
    <td><code>BLOG_TITLE</code></td>
    <td>The title of the blog, which will be displayed on the navbar and in some <code>meta</code> tags of the blog for SEO.</td>
  </tr>
  <tr>
    <td><code>BLOG_URL</code></td>
    <td>The base URL of the blog.</td>
  </tr>
  <tr>
    <td><code>BLOG_DESCRIPTION</code></td>
    <td>A short string to describe the blog, which will be displayed on the sidebar and in some <code>meta</code> tags of the blog for SEO.</td>
  </tr>
  <tr>
    <td><code>BLOG_FEATURE_IMAGE_URL</code></td>
    <td>The URL to a feature image, which will be displayed on the sidebar and in some <code>meta</code> tags of the blog for SEO.</td>
  </tr>
  <tr>
    <td><code>SHOW_FIRST_NAME_FIRST</code></td>
    <td>Boolean value indicating whether authors' names on this blog are displayed with first name first or second.</td>
  </tr>
  <tr>
    <td><code>CONTACTS</code></td>
    <td>An object containing three values <code>FACEBOOK</code>, <code>GITHUB</code> and <code>EMAIL</code>, storing the URL to these contact addresses. They will be displayed in the footer.</td>
  </tr>
  <tr>
    <td><code>BUTTER_CMS_API_KEY</code></td>
    <td>The API key to use ButterCMS's backend.</td>
  </tr>
  <tr>
    <td rowspan="3"><code>NAVBAR_CONFIGS</code></td>
    <td><code>HOME_PAGE_TEXT</code></td>
    <td>The text of the link to the Home page on the navbar.</td>
  </tr>
  <tr>
    <td><code>TAGS_LIST_PAGE_TEXT</code></td>
    <td>The text of the link to the Tags List page on the navbar.</td>
  </tr>
  <tr>
    <td><code>ABOUT_PAGE_TEXT</code></td>
    <td>The text of the link to the About page on the navbar</td>
  </tr>
  <tr>
    <td rowspan="2"><code>SIDEBAR_CONFIGS</code></td>
    <td><code>ABOUT_BLOG_TEXT</code></td>
    <td>The text of the title of the blog description section on the sidebar.</td>
  </tr>
  <tr>
    <td><code>FACEBOOK_PAGE_TEXT</code></td>
    <td>The text of the title of the Facebook Page plugin on the sidebar</td>
  </tr>
  <tr>
    <td rowspan="3"><code>HOME_PAGE_CONFIGS</code></td>
    <td><code>MAX_LATEST_POSTS</code></td>
    <td>The number of latest posts to display.</td>
  </tr>
  <tr>
    <td><code>MAX_CATEGORY_LATEST_POSTS</code></td>
    <td>The number of latest posts of each category to display.</td>
  </tr>
  <tr>
    <td><code>LATEST_POSTS_TEXT</code></td>
    <td>The text of the title of the latest posts section on the Home page.</td>
  </tr>
  <tr>
    <td rowspan="3"><code>POST_PAGE_CONFIGS</code></td>
    <td><code>PREVIOUS_POST_TEXT</code></td>
    <td>The text of the link to the previous post on the Post page.</td>
  </tr>
  <tr>
    <td><code>NEXT_POST_TEXT</code></td>
    <td>The text of the link to the next post on the Post page.</td>
  </tr>
  <tr>
    <td><code>ABOUT_AUTHOR_TEXT</code></td>
    <td>The text of the title of the author description section on the sidebar.</td>
  </tr>
  <tr>
    <td rowspan="4"><code>ARCHIVE_PAGE_CONFIGS<br></code></td>
    <td><code>ARCHIVE_PAGE_SIZE</code></td>
    <td>The number of posts per page to display on the Archive pages of categories, tags and authors.</td>
  </tr>
  <tr>
    <td><code>ARCHIVE_PAGE_TITLE_CATEGORY</code></td>
    <td>A function, receiving a category name and the current page number, to return the title of the Category Archive page.</td>
  </tr>
  <tr>
    <td><code>ARCHIVE_PAGE_TITLE_TAG</code></td>
    <td>A function, receiving a tag name and the current page number, to return the title of the Tag Archive page.</td>
  </tr>
  <tr>
    <td><code>ARCHIVE_PAGE_TITLE_AUTHOR</code></td>
    <td>A function, receiving an author name and the current page number, to return the title of the Author Archive page.</td>
  </tr>
  <tr>
    <td rowspan="3"><code>SEARCH_PAGE_CONFIGS</code></td>
    <td><code>SEARCH_PAGE_TITLE</code></td>
    <td>The title of the Search page.</td>
  </tr>
  <tr>
    <td><code>SEARCH_PAGE_SIZE</code></td>
    <td>The number of search results to return on the Search page.</td>
  </tr>
  <tr>
    <td><code>NO_RESULT_TEXT</code></td>
    <td>A string to display when there is no search result returned.</td>
  </tr>
  <tr>
    <td><code>TAGS_LIST_PAGE_CONFIGS</code></td>
    <td><code>TAGS_LIST_PAGE_TITLE</code></td>
    <td>The title of the Tags List page.</td>
  </tr>
  <tr>
    <td rowspan="2"><code>ABOUT_US_PAGE_CONFIGS</code></td>
    <td><code>ABOUT_PAGE_TITLE</code></td>
    <td>The title of the About page.</td>
  </tr>
  <tr>
    <td><code>AUTHORS_LIST_TEXT</code></td>
    <td>The title of the section displaying authors on the About page.</td>
  </tr>
</table>

### `src/configs/about-page-content.html`

Here you can edit the content inside About Page in HTML.

### `src/configs/footer-content.html`

Here you can edit the content inside the footer in HTML.

### `src/configs/variables.scss`

Here you can find the variables relating to the typefaces and colors of the blog.

<a name="license"></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
