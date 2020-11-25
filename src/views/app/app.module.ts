import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared-module/shared-module.module';

import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import xml from 'highlight.js/lib/languages/xml';


const HLJS_LANGUAGE = () => [
  { name: 'cpp', func: cpp },
  { name: 'css', func: css },
  { name: 'java', func: java },
  { name: 'javascript', func: javascript },
  { name: 'php', func: php },
  { name: 'python', func: python },
  { name: 'ruby', func: ruby },
  { name: 'markup', func: xml }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FontAwesomeModule,
    AppRoutingModule,
    BrowserTransferStateModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: HLJS_LANGUAGE,
        configs: {

        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
