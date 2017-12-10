
<template>
  <div v-if="viewer">
    <h1>Apollo Vue Fetch. name: {{viewer.name}}</h1>
    <ul>
      <li v-for="(feed, index) in viewer.feeds" :key="index">{{feed.title}}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const ApolloFetchComponent = {
  apollo: {
    viewer: gql`
    query SimpleFetchViewer{
      viewer {
        id
        name
        feeds {
          id
          title
        }
      }
    }`
  },
  data() {
    return {
      viewer: {}
    }
  },
};

export default ApolloFetchComponent;
</script>