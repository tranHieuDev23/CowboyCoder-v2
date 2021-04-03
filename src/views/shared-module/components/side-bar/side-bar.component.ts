import { Component } from '@angular/core';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  aboutBlogText: string = GLOBAL_CONFIGS.SIDEBAR_CONFIGS.ABOUT_BLOG_TEXT;
  featureImage: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL;
  description: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION;
}
