const { response } = require('express')
const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoleka'
  })

connection.connect()

app.get('/', (req,res) => {
    res.json({"name" : "Joshu Ombasa Nyambega"})
})

app.get('/customers', (req, res) => {
    let sql = 'SELECT * FROM customer'
    connection.query(sql, (error, results) => {
        if (error) res.send(error);
        res.json({customers: results})
    })
})

app.get('/customers/:id', (req, res) => {
    const id = req.params.id
    let sql = 'SELECT * FROM customer WHERE customer_id = ?'
    connection.query(sql, [parseInt(id)], (error, response) => {
        if (error) res.send(error)
        res.send(response)
    })
})

app.post('/customers', () => {
    
})



app.listen(3000, () => {
    console.log('server listening on port 3000')
})