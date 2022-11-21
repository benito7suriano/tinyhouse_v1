import express from 'express'

const app = express()
const port = 9000

const one = 1
const two = 2

// To notify that we're aware of this unused parameter, we can prefix the req param with an underscore.
app.get('/',(_req,res) => res.send(`1 + 2 = ${one+two}`))

app.listen(port)

console.log(`[app] : http://localhost:${port}`)
