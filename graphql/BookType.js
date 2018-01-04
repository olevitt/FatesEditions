const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
} = require('graphql/type')
const { getProjection } = require('./Helpers')

const Book = require('../models/BookModel')
const StatType = require('./StatType')
const ObjectType = require('./ObjectType')
const PageType = require('./PageType')

const type = new GraphQLObjectType({
  name: 'book',
  description: 'A book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    tags: {
      type: GraphQLList(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    synopsis: {
      type: GraphQLString,
    },
    cover: {
      type: GraphQLString,
    },
    startingPageId: {
      type: GraphQLID,
    },
    genreId: {
      type: GraphQLID,
    },
    authorId: {
      type: GraphQLID,
    },
    draft: {
      type: GraphQLBoolean,
      description: "True if the book is a draft, false if it is published"
    },
    creationDate: {
      type: GraphQLString,
    },
    lastModificationDate: {
      type: GraphQLString,
    },
    revision: {
      type: GraphQLInt,
    },
    stats: {
      type: GraphQLList(StatType.type)
    },
    objects: {
      type: GraphQLList(ObjectType.type)
    },
    pages: {
      type: GraphQLList(PageType.type)
    },
  })
})


// const Book = new Schema({
//   pages: [Page],
// })


const resolve = {
  type: new GraphQLList(type),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    author: {
      name: 'author',
      type: GraphQLID,
    }
  },
  resolve: (root, args, source, fieldASTs) => {
    const { id, author } = args
    const projections = getProjection(fieldASTs)
    const filters = {}
    if (id) filters._id = id
    if (author) filters.authorId = author
    return Book.find(filters, projections)
  }
}

module.exports = {
  type,
  resolve,
}
