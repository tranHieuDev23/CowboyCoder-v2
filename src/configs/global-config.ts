import { BUTTER_CMS_API_KEY } from './api-keys';

export const GLOBAL_CONFIGS = {
    GENERAL_CONFIGS: {
        BLOG_TITLE: "Cowboy Coder",
        BLOG_URL: "www.cowboycoder.tech",
        BLOG_DESCRIPTION: "Cowboy Coder là trang thông tin - kiến thức về Giải thuật - lập trình cho học sinh và sinh viên.",
        BLOG_FEATURE_IMAGE_URL: 'https://d33wubrfki0l68.cloudfront.net/img/6f13ae779dd56ed905a3f87a40cd89d16161fbed/stock_image.jpg',
        SHOW_FIRST_NAME_FIRST: false,
        CONTACTS: {
            FACEBOOK: 'https://www.facebook.com/cowboycoding',
            GITHUB: 'https://github.com/cowboycodervn',
            EMAIL: 'cowboycodervn@gmail.com'
        },
        BUTTER_CMS_API_KEY: BUTTER_CMS_API_KEY
    },
    NAVBAR_CONFIGS: {
        HOME_PAGE_TEXT: 'Home',
        TAGS_LIST_PAGE_TEXT: 'Danh mục tag',
        ABOUT_PAGE_TEXT: 'About Us'
    },
    SIDEBAR_CONFIGS: {
        ABOUT_BLOG_TEXT: 'Về trang web',
        FACEBOOK_PAGE_TEXT: 'Follow us on Facebook'
    },
    HOME_PAGE_CONFIGS: {
        MAX_LATEST_POSTS: 5,
        MAX_CATEGORY_LATEST_POSTS: 3,
        LATEST_POSTS_TEXT: 'Bài viết mới nhất'
    },
    POST_PAGE_CONFIGS: {
        PREVIOUS_POST_TEXT: 'Bài viết trước',
        NEXT_POST_TEXT: 'Bài viết sau',
        ABOUT_AUTHOR_TEXT: 'Về tác giả'
    },
    ARCHIVE_PAGE_CONFIGS: {
        ARCHIVE_PAGE_SIZE: 10,
        ARCHIVE_PAGE_TITLE_CATEGORY: (categoryName, pageNumber) => `Bài viết thuộc chủ đề ${categoryName} - trang ${pageNumber}`,
        ARCHIVE_PAGE_TITLE_TAG: (tagName, pageNumber) => `Bài viết gắn tag ${tagName} - trang ${pageNumber}`,
        ARCHIVE_PAGE_TITLE_AUTHOR: (authorName, pageNumber) => `Bài viết của tác giả ${authorName} - trang ${pageNumber}`,
    },
    SEARCH_PAGE_CONFIGS: {
        SEARCH_PAGE_TITLE: 'Tìm kiếm',
        SEARCH_PAGE_SIZE: 15,
        NO_RESULT_TEXT: 'Không tìm thấy kết quả nào. Bạn nên thử một từ khóa cụ thể hơn.'
    },
    TAGS_LIST_PAGE_CONFIGS: {
        TAGS_LIST_PAGE_TITLE: 'Danh mục tag trên trang'
    },
    ABOUT_US_PAGE_CONFIGS: {
        ABOUT_PAGE_TITLE: 'About Us',
        AUTHORS_LIST_TEXT: 'Các tác giả'
    }
};