const { HttpLink } = require('@apollo/client');
const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
const shortid = require("shortid");

const typeDefs = gql`
    type Query {
    hello: String
    getLollybyLink(link:String!):Lolly

  }

  type Lolly {
    recipient: String!
    message: String!
    sender: String!
    c1: String!
    c2: String!
    c3: String!
    link: String!
  }
  type Mutation {
    createLolly (
      recipient: String!, 
      message: String!,
      sender: String!, 
      c1: String!,
      c2: String!,
      c3: String!) : Lolly
  }
`


const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, Lolly!'
    },

    getLollybyLink: async (_, { link }) => {
      try {
        const client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });

        const result = await client.query(
          q.Get(q.Match(q.Index("lolly"), link))
        )
        return result.data
      }

      catch (err) {

      }
    }


  },
  Mutation: {
    createLolly: async (_, args) => {

      console.log("args = ", args);
      try {
        var client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });
        console.log(args)
        var id = shortid.generate();
        args.link = id

        const result = await client.query(


          // q.Create(q.Ref(q.Collection('lollies'), id), {
          //      data: args 
          //   }
          // )

          q.Create(q.Collection("lollies"), {
            data: args
          })

        );
        console.log('result', result.data);
        return result.data
      } catch (err) { console.log(err) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()