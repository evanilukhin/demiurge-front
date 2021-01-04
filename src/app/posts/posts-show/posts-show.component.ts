import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { Apollo, gql } from 'apollo-angular';
import {Post} from "../../app-types";

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
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.scss']
})
export class PostsShowComponent implements OnInit {

  private querySubscription: Subscription;
  post: Post;
  postId: string;
  loading: boolean;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.postId = route.snapshot.params.id;
    this.querySubscription = {} as Subscription;
    this.post = {} as Post;
    this.loading = true;
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
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
