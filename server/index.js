const koa = require( 'koa');
const koaRouter = require( 'koa-router');
const koaBody = require( 'koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require( 'apollo-server-koa');
const myGraphQLSchema = require( './graphql/schema').default;
const cors = require('@koa/cors');
const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(cors());
app.use(koaBody());


router.post('/graphql', graphqlKoa((ctx) => {
  return {
    schema: myGraphQLSchema,
    context: { userId: ctx.cookies.get('userId') || 1 }
  };
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
}));
