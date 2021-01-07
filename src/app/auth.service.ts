import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(password: string) {
    return this.http.post<any>(`${environment.apiEndpoint}/authenticate`, { password }, { observe: 'response' }).pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      localStorage.setItem('auth-token', response.headers.get('Auth-Token') as string)
    });
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  deleteToken() {
    localStorage.removeItem('auth-token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
