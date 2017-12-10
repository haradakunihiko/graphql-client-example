const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query {
    viewer: User
  }
  type User {
    id: String
    name: String
    feeds: [Feed]
  }
  type Feed {
    id: String
    title: String
    body: String
  }
  type Mutation {
    updateViewerName(name: String): User
  }
`;

function fetchUser(userId) {
  return {
    id: '1',
    name: 'harada'
  };
}

function fetchFeeds(userId) {
  return [
    {
      id: '1',
      title: 'advent calendar 1st day',
      body: 'this is the first ...'
    }, {
      id: '2',
      title: 'advent calendar 2nd day',
      body: 'this is the second ....'
    }
  ]
}

const resolvers = {
  Query: {
    viewer: (root, args, ctx) => {
      return fetchUser(ctx.userId);
    },
  },
  User: {
    feeds: (user) => fetchFeeds(user.id),
  },
  Mutation: {
    updateViewerName(root, args) {
      console.log(args);
      return {
        id: '1',
        name: args.name
      }
    }
  }
};

exports.default = makeExecutableSchema({ typeDefs, resolvers });
