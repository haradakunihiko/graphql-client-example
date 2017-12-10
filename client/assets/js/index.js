import Vue from 'vue/dist/vue.esm';
import Application from './components/Application.vue';
import { ApolloClient } from 'apollo-client'
import VueApollo from 'vue-apollo'

import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
})

window.apolloCache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: window.apolloCache,
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
window.apolloClient = apolloClient;

var app = new Vue({
  el: '#app',
  apolloProvider,
  components: {
    Application
  },
  render(h) {
    return h(Application);
  },
});

