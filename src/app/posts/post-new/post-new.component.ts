import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Subscription} from "rxjs";
import {Post} from "../../app-types";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder} from "@angular/forms";



const CREATE_POST = gql`
  mutation createPost($header: String!, $mainPart: String!, $short:Boolean!, $summary: String!,  $tags: [String!]) {
    createPost(header: $header, mainPart: $mainPart, summary: $summary, short: $short, tags: $tags) {
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
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

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
    tags: [[]],
  });

  constructor(private route: ActivatedRoute, private apollo: Apollo, private fb: FormBuilder) {
    this.postId = route.snapshot.params.id;
    this.querySubscription = {} as Subscription;
    this.post = {} as Post;
    this.loading = true;
    this.previewHidden = true;
  }

  ngOnInit(): void {

  }

  createPost():void {
    let value = this.postForm.value;
    value.tags = value.tags.map((x:any) => x.value)

    console.log({ id: this.post.id, ...value })

    this.apollo.mutate({
      mutation: CREATE_POST,
      variables: value
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ngOnDestroy() { }
}
