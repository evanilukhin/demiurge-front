import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Subscription} from "rxjs";
import {Post} from "../../app-types";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder} from "@angular/forms";



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

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $mainPart: String!, $header: String!, $short:Boolean!, $summary: String!, $tags: [String!]) {
    updatePost(id: $id, header: $header, mainPart: $mainPart, summary: $summary, short: $short, tags: $tags) {
      id
      header
      tags
      short
      summary
      mainPart
    }
  }
`;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  private querySubscription: Subscription;
  post: Post;
  postId: string;
  loading: boolean;
  previewHidden: boolean;

  postForm = this.fb.group({
    header: [''],
    mainPart: [''],
    summary: [''],
    short: [false],
    tags: [['']],
  });

  constructor(private route: ActivatedRoute, private apollo: Apollo, private fb: FormBuilder) {
    this.postId = route.snapshot.params.id;
    this.querySubscription = {} as Subscription;
    this.post = {} as Post;
    this.loading = true;
    this.previewHidden = true;
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
        this.postForm.patchValue({
          header: this.post.header,
          summary: this.post.summary,
          mainPart: this.post.mainPart,
          short: this.post.short,
          tags: this.post.tags?.map((x)=>({display: x, value: x}))
        });
        this.loading = loading;
      });
  }

  updatePost():void {
    let value = this.postForm.value;
    value.tags=value.tags.map((x:any) => x.value)
    console.log({ id: this.post.id, ...value })
    this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: { id: this.post.id, ...value }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
