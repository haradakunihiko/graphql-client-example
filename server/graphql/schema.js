var { setTimeout } = require('timers');
var sleep = require('sleep');

const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query {
    viewer: User
    users: [User]
  }
  type User {
    id: String!
    name: String
    feeds: [Feed]
  }
  type Feed {
    id: String
    title: String
    body: String
    author: User
  }
  type Mutation {
    updateViewerName(name: String): User
  }
`;

function fetchUser(userId) {
  return {
    id: userId,
    name: `USER-${userId}`
  };
}

function fetchUsers() {
  return [{
    id: '1',
    name: 'USER-1'
  },{
    id: '2',
    name: 'USER-2'
  },{
    id: '3',
    name: 'USER-3'
  },{
    id: '4',
    name: 'USER-4'
  }];
}

async function fetchFeedsByUser(userId) {
  return new Promise(function(resolve, reject){
    sleep.sleep(1);
    resolve(
      [
        {
          id: '1',
          title: 'advent calendar 1st day',
          body: 'this is the first ...',
          authorId: 1
        }, {
          id: '2',
          title: 'advent calendar 2nd day',
          body: 'this is the second ....',
          authorId: 2
        }
      ]
    );
  });
}

const resolvers = {
  Query: {
    viewer: (root, args, ctx) => {
      return fetchUser(ctx.userId);
    },
    users: () => {
      return fetchUsers();
    }
  },
  User: {
    feeds: (user) => fetchFeedsByUser(user.id),
  },
  Feed: {
    author: (feed) => fetchUser(feed.authorId)
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
