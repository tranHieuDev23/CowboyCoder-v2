import { BUTTER_CMS_API_KEY } from './api-keys';

export const GLOBAL_CONFIGS = {
    GENERAL_CONFIGS: {
        BLOG_TITLE: "ThatPenguinGuy",
        BLOG_URL: "https://thatpenguinguy.herokuapp.com",
        BLOG_DESCRIPTION: "My name is Trần Minh Hiếu, and this blog is where I write about techs, games, software development and other stuffs that I like.",
        BLOG_FEATURE_IMAGE_URL: '/assets/sidebar-image.jpg',
        SHOW_FIRST_NAME_FIRST: false,
        CONTACTS: {
            FACEBOOK: 'https://www.facebook.com/hieu.tranminh.92505956/',
            GITHUB: 'https://github.com/tranHieuDev23',
            EMAIL: 'alwaysbelieve239@gmail.com'
        },
        BUTTER_CMS_API_KEY: BUTTER_CMS_API_KEY
    },
    NAVBAR_CONFIGS: {
        HOME_PAGE_TEXT: 'Home',
        TAGS_LIST_PAGE_TEXT: 'Tag list',
        ABOUT_PAGE_TEXT: 'About'
    },
    SIDEBAR_CONFIGS: {
        ABOUT_BLOG_TEXT: 'About the blog'
    },
    HOME_PAGE_CONFIGS: {
        MAX_LATEST_POSTS: 5,
        MAX_CATEGORY_LATEST_POSTS: 3,
        LATEST_POSTS_TEXT: 'Latest posts'
    },
    POST_PAGE_CONFIGS: {
        PREVIOUS_POST_TEXT: 'Previous post',
        NEXT_POST_TEXT: 'Next post',
        ABOUT_AUTHOR_TEXT: 'About the author'
    },
    ARCHIVE_PAGE_CONFIGS: {
        ARCHIVE_PAGE_SIZE: 10,
        ARCHIVE_PAGE_TITLE_CATEGORY: (categoryName, pageNumber) => `Posts in category ${categoryName} - page ${pageNumber}`,
        ARCHIVE_PAGE_TITLE_TAG: (tagName, pageNumber) => `Posts with tag ${tagName} - page ${pageNumber}`,
        ARCHIVE_PAGE_TITLE_AUTHOR: (authorName, pageNumber) => `Posts of author ${authorName} - page ${pageNumber}`,
    },
    SEARCH_PAGE_CONFIGS: {
        SEARCH_PAGE_TITLE: 'Search',
        SEARCH_PAGE_SIZE: 15,
        NO_RESULT_TEXT: 'No result was found.'
    },
    TAGS_LIST_PAGE_CONFIGS: {
        TAGS_LIST_PAGE_TITLE: 'Tag List'
    },
    ABOUT_US_PAGE_CONFIGS: {
        ABOUT_PAGE_TITLE: 'About',
        AUTHORS_LIST_TEXT: 'Authors'
    }
};