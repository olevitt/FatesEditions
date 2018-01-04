const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql/type')
const book = require('./BookType.js')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: book.resolve,
    }
  })
})


module.exports = schema
