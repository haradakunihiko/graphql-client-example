
<template>
  <div v-if="viewer">
    <h1>Apollo Mutate. name: {{viewer.name}}</h1>
    <ul>
      <li v-for="(feed, index) in viewer.feeds" :key="index">
        {{feed.title}}
      </li>
    </ul>
    <input v-model="name"/>
    <button @click="changeName">Change your name</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const ApolloMutateComponent = {
  apollo: {
    viewer: gql`query MutateFetchViewer {
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
      viewer: {},
      name: ''
    }
  },
  methods: {
    changeFeed() {

    },
    changeName() {
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            updateViewerName(name: "${this.name}") {
              id
              name
            }
          }
        `,
      });
    }
  }
};

export default ApolloMutateComponent;
</script>
