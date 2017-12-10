<template>
  <div>
    <h1>Simple Fetch. name: {{name}}</h1>
    <ul>
      <li v-for="(feed, index) in feeds" :key="index">{{feed.title}}</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';

const SimpleFetchComponent = {
  data() {
    return {
      name: '',
      feeds: []
    }
  },
  created() {
    axios.post('http://localhost:3000/graphql', {
      query: 'query{viewer{name\nfeeds{title}}}',
    }).then((res) => {
      console.log(res.data.data)
      this.name = res.data.data.viewer.name;
      this.feeds = res.data.data.viewer.feeds;
    });
  }
};

export default SimpleFetchComponent;
</script>
