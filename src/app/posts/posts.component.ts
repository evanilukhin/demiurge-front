import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo, QueryRef, gql} from 'apollo-angular';
import {Post, PostPreview} from "../app-types";
import {Subscription} from "rxjs";

const GET_POSTS = gql`
  query getPosts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit){
      id
      tags
      summary
      header
      insertedAt
    }
  }
`

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  loading: boolean;
  posts: PostPreview[];
  queryRef: QueryRef<any>;
  querySubscription: Subscription;

  constructor(private apollo: Apollo) {
    this.loading = true;
    this.posts = [];
    this.queryRef = {} as QueryRef<any>;
    this.querySubscription = {} as Subscription;
  }

  ngOnInit() {
    this.queryRef = this.apollo.watchQuery<any>({
      query: GET_POSTS,
      variables: {
        offset: 0,
        limit: 3,
      }
    });
    this.querySubscription =
      this.queryRef
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.posts = data.posts;
        });
  }

  fetchMore() {
    this.queryRef.fetchMore({
      // query: ... (you can specify a different query. feedQuery is used by default)
      variables: {
        offset: this.posts.length,
      },
      // We are able to figure out which offset to use because it matches
      // the feed length, but we could also use state, or the previous
      // variables to calculate this (see the cursor example below)
      updateQuery: (prev: any, { fetchMoreResult } : any) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        });
      },
    });
  }

  ngOnDestroy() {
    console.log('posts ngOnDestroy')
    this.querySubscription.unsubscribe();
  }
}
