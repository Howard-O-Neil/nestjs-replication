import express from "express"

export const app = express()
const port=3000

app.get('/', (_, res) => {
    res.send('hello world ')
})

import "./application/people_info"

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

