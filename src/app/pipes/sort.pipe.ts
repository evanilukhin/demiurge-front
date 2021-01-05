import { Pipe, PipeTransform } from '@angular/core';
import {Maybe} from "../app-types";

@Pipe({ name: 'sort' })

export class SortPipe implements PipeTransform {
  transform(strings: Maybe<string>[] | null | undefined) {
    if(strings == null) {
      return strings
    } else {
      return strings.slice().sort()
    }
  }
}
