import { google } from 'googleapis'
import { Client } from '@googlemaps/google-maps-services-js'
const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`,
)

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  logIn: async (code: string) => {
    // make a request to Google using a 'code' arg to get a user's access token
    const { tokens } = await auth.getToken(code)

    auth.setCredentials(tokens)

    // At this moment, we can now use the configured auth object to make a request to Google's People API to get the user information we'll need. To do so, we'll run the people() constructor from the imported google object.
    const { data } = await google.people({ version: 'v1', auth }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    })

    return { user: data }
  },
  geocode: async (address: string) => {
    // boilerplate
  },
}
