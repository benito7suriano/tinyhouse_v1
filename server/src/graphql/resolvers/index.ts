import merge from 'lodash.merge'
import { viewerResolvers } from './Viewer'
import { userResolvers } from './User'
import { listingResolvers } from './Listing'

export const resolvers = merge(viewerResolvers, userResolvers, listingResolvers)
