import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from "./posts/posts.component";
import {AboutComponent} from "./about/about.component";
import {PostShowComponent} from "./posts/post-show/post-show.component";
import {PostNewComponent} from "./posts/post-new/post-new.component";
import { PostEditComponent } from './posts/post-edit/post-edit.component';

const routes: Routes = [
  { path: 'posts/new', component: PostNewComponent },
  { path: 'posts/:id', component: PostShowComponent },
  { path: 'posts/:id/edit', component: PostEditComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'about', component: AboutComponent },
  { path: '',   redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
