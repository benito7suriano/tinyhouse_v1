const express = require('express')

const app = express()
const port = 9000

let one = 1
let two = 2

app.get('/',(req:any,res:any) => res.send(`1 + 2 = ${one+two}`))

app.listen(port)

console.log(`[app] : http://localhost:${port}`)
