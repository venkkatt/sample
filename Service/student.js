const express = require('express')
const app = express()
const PORT = 3002
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')


let db = new sqlite3.Database('./student.db')

app.get('/student',cors(), (req, res, next) => {
  db.all('SELECT * FROM student', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.status(200).json({ rows })
  })
})

app.get('/student/:id',cors(), (req, res, next) => {
  var params = [req.params.id]
  db.get(
    `SELECT * FROM student where rollno = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.status(200).json(row)
    }
  )
})

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
