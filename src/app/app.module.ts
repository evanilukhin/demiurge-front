import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DialogModule } from '@ngneat/dialog';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { PostShowComponent } from './posts/post-show/post-show.component';

import { SortPipe } from "./pipes/sort.pipe";
import { LoginModalComponent } from './login-modal/login-modal.component';
import {AuthService} from "./auth.service";
import { PostNewComponent } from './posts/post-new/post-new.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    AboutComponent,
    FooterComponent,
    PostShowComponent,
    SortPipe,
    LoginModalComponent,
    PostNewComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    DialogModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
