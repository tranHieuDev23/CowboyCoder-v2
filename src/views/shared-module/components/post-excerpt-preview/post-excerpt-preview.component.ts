import { Component, Input } from '@angular/core';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-excerpt-preview',
  templateUrl: './post-excerpt-preview.component.html',
  styleUrls: ['./post-excerpt-preview.component.scss']
})
export class PostExcerptPreviewComponent {
  @Input() post: Post;
}
