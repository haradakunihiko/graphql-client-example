<template>
  <div>
    <SimpleFetchComponent />
    <ApolloClientComponent />
    <ApolloFetchComponent />
    <ApolloMutateComponent />
  </div>
</template>
<script>
import axios from 'axios';
import SimpleFetchComponent from './SimpleFetchComponent.vue';
import ApolloFetchComponent from './ApolloFetchComponent.vue';
import ApolloMutateComponent from './ApolloMutateComponent.vue';
import ApolloClientComponent from './ApolloClientComponent.vue';

const Application = {
  components: {
    SimpleFetchComponent,
    ApolloFetchComponent,
    ApolloMutateComponent,
    ApolloClientComponent
  },
};

export default Application;
</script>
