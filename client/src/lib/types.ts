// null means the field requested is not available. In our `logIn` mutation, we're requesting all fields within the `Viewer` object type, and if they're not available, they will come back as `null` values.
export interface Viewer {
  id: string | null
  token: string | null
  avatar: string | null
  hasWallet: boolean | null
  didRequest: boolean
}
