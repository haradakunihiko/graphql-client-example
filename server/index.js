const koa = require( 'koa');
const koaRouter = require( 'koa-router');
const koaBody = require( 'koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require( 'apollo-server-koa');
const myGraphQLSchema = require( './graphql/schema').default;
const cors = require('@koa/cors');
require('dotenv').config()

var { Engine } = require('apollo-engine');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

const engine = new Engine({
  engineConfig: {
    apiKey: process.env.APOLLO_ENGINE_API_KEY,
    logging: {
      level: 'DEBUG'   // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    }
  },
  graphqlPort: PORT,  // GraphQL port
  endpoint: '/graphql',                   // GraphQL endpoint suffix - '/graphql' by default
  dumpTraffic: true                       // Debug configuration that logs traffic between Proxy and GraphQL server
});
engine.start()

app.use(engine.koaMiddleware());
app.use(cors());
app.use(koaBody());

router.post('/graphql', graphqlKoa((ctx) => {
  return {
    schema: myGraphQLSchema,
    context: { userId: ctx.cookies.get('userId') || 1 },
    tracing: true,
    cacheControl: true
  };
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
}));
