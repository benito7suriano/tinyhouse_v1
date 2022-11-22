import express from 'express'

import { listings } from './listings'

const app = express()
const port = 9000

const one = 1
const two = 2

app.get('/',(_req,res) => res.send(`1 + 2 = ${one+two}`))

// To notify that we're aware of this unused parameter, we can prefix the req param with an underscore.
app.get('/listings', (_req,res) => {
  res.send(listings)
})



app.listen(port, () => {
  console.log(`[app] : http://localhost:${port}`)
})
