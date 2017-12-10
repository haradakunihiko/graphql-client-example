<template>
  <div>
    <h1>Apollo Client Fetch. name: {{name}}</h1>
    <ul>
      <li v-for="(feed, index) in feeds" :key="index">{{feed.title}}</li>
    </ul>
  </div>
</template>
<script>
import gql from 'graphql-tag'

const ApolloClientComponent = {
  data() {
    return {
      name: '',
      feeds: []
    }
  },
  created() {
    window.apolloClient.query({
      query: gql`
        query {
          viewer {
            id
            name
            feeds {
              id
              title
            }
          }
        }
      `
    }).then((res) => {
      console.log('client');
      console.log(res.data)
      this.name = res.data.viewer.name;
      this.feeds = res.data.viewer.feeds;
    })
  }
};

export default ApolloClientComponent;
</script>
