import { listings } from "../listings";
import { IResolvers } from "@graphql-tools/utils";
import { Database } from "../lib/types";

export const resolvers: IResolvers = {
  Query: {
    listings: async (_root:undefined, _args:Record<string, unknown>, { db }: {db: Database} ) => {
      return await db.listings.find({}).toArray()
    }
  },
  Mutation: {
    deleteListing: (_root, { id }) => {
      for(let i = 0; i < listings.length; i++) {
        if(listings[i].id === id) {
          return listings.splice(i,1)[0]
        }
      }

      throw new Error('failed to complete listing')
    }
  }
}
