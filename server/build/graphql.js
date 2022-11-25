"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const listings_1 = require("./listings");
const Listing = new graphql_1.GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        address: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numOfGuests: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numOfBeds: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numOfBaths: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        rating: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    }
});
const query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        listings: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(Listing))),
            resolve: () => listings_1.listings
        }
    }
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        deleteListing: {
            type: new graphql_1.GraphQLNonNull(Listing),
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (_root, { id }) => {
                for (let i = 0; i < listings_1.listings.length; i++) {
                    if (listings_1.listings[i].id === id) {
                        return listings_1.listings.splice(i, 1)[0];
                    }
                }
                throw new Error("failed to deleted listing");
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query, mutation });
