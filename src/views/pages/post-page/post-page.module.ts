import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageComponent } from './post-page.component';
import { PostPageRoutingModule } from './post-page-routing.module';
import { SharedModule } from '../../shared-module/shared-module.module';
import { HighlightModule } from 'ngx-highlightjs';



@NgModule({
  declarations: [PostPageComponent],
  imports: [
    CommonModule,
    PostPageRoutingModule,
    SharedModule,
    HighlightModule
  ]
})
export class PostPageModule { }
