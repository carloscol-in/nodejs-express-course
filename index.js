const express = require('express')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json())

// white list of permitted origins
const whitelist = [
  'http://localhost:8080',
  'https://mydomain.com '
]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) callback(null, true)
    else callback(new Error('No permission to call'))
  }
}
app.use(cors(options))

const routerApi = require('./routes/index')

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Listening on port: ' + port)
})
