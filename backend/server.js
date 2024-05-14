const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors()) // Enable CORS

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})