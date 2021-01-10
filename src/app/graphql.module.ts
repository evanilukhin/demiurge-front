import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from "@apollo/client/link/context";
import {AuthService} from "./auth.service";

const uri = 'http://localhost:4000/api/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, authService: AuthService): ApolloClientOptions<any> {

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, {headers}) => {
    console.log(authService.getToken())

    if (authService.isLoggedIn()) {
      return  {
        headers: {
          'Access-Control-Allow-Credentials':  true,
          'Auth-Token': authService.getToken(),
        }
      };
    } else {
      return {};
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri,  withCredentials: true })]);

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
