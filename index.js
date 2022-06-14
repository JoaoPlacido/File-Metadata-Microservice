const express = require('express')
const app = express()

require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static('public'))

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

var listener = app.listen(3000, () => {
  console.log('listening on port ' + listener.address().port)
})
