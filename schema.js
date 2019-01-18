const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// Mock data

const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'jdoe@example.com',
    age: 35
  },
  {
    id: '2',
    name: 'Steve Smith',
    email: 'steve@example.com',
    age: 25
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'swilliams@example.com',
    age: 32
  }
]

// Customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i]
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve (parentValue, args) {
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
