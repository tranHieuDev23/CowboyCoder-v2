import { Component, Input } from '@angular/core';
import { Author } from 'src/models/author';
import { faFacebookF, faTwitter, faInstagram, faPinterest, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bio-box',
  templateUrl: './bio-box.component.html',
  styleUrls: ['./bio-box.component.scss']
})
export class BioBoxComponent {
  @Input() author: Author;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faPinterest = faPinterest;
  faLinkedinIn = faLinkedinIn;
  faEnvelope = faEnvelope;
}
