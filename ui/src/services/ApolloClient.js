/* eslint-disable */
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { concat } from 'apollo-link'
import { onError } from 'apollo-link-error'
import RouteService from './RouteService'
import { InMemoryCache } from 'apollo-cache-inmemory'
import HttpService from './HttpService'

const errorMiddleware = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const unauthorized = !!graphQLErrors.find(({ code }) => code === 401)
    if(unauthorized) {
      RouteService.redirect401()
      response.errors = null
    }
  }
});

const client = new ApolloClient({
  link: concat(errorMiddleware, new HttpLink({
    uri: '/api/graphql',
    fetch: HttpService.fetch,
  })),
  cache: new InMemoryCache(),
})

export default client
