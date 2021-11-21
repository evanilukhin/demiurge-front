import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { Apollo, gql } from 'apollo-angular';
import {Post} from "../../app-types";
import {Title} from "@angular/platform-browser";

// We use the gql tag to parse our query string into a query document
const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      header
      headImage
      summary
      tags
      short
      mainPart
      insertedAt
    }
  }
`;

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {

  private querySubscription: Subscription;
  post: Post;
  postId: string;
  loading: boolean;

  constructor(private route: ActivatedRoute, private apollo: Apollo, private titleService: Title) {
    this.postId = route.snapshot.params.id;
    this.querySubscription = {} as Subscription;
    this.post = {} as Post;
    this.loading = true;
    this.titleService = titleService;
  }

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery({
        query: GET_POST,
        variables: {
          id: this.postId,
        },
      })
      .valueChanges.subscribe(({data, loading} : any) => {
        this.post = data.post;
        this.titleService.setTitle('Ivan Ilukhin - ' + data.post.header);
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
