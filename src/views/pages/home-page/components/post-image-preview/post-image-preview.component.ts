import { Component, Input } from '@angular/core';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-image-preview',
  templateUrl: './post-image-preview.component.html',
  styleUrls: ['./post-image-preview.component.scss']
})
export class PostImagePreviewComponent {
  @Input() post: Post;
}
