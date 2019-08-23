import { Component } from '@angular/core';
import { faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faSquare } from "@fortawesome/free-solid-svg-icons";
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import html from 'html-loader!../../../../configs/footer-content.html';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faFacebookF = faFacebookF;
  faGitHub = faGithub;
  faEnvelope = faEnvelope;
  faSquare = faSquare;
  facebookContact: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.CONTACTS.FACEBOOK;
  githubContact: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.CONTACTS.GITHUB;
  emailContact: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.CONTACTS.EMAIL;
  currentYear: number = new Date().getFullYear();
  blogTitle: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_TITLE;
  footerContent = html;
}
