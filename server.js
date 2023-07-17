const { response, json } = require('express')

const express = require('express')

const mysql = require('mysql')

const cors = require('cors');  

const app = express()

app.use(cors());

app.use(express.json())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoleka'
  })

connection.connect()

app.get('/', (req,res) => {
    res.json({"name" : "Joshua Ombasa Nyambega"})
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
    connection.query(sql, [parseInt(id)], (error, results) => {
        if (error) res.send(error)
        res.send(results)
    })
})

app.post('/customers', (req, res) => {
    const {name, location, country} = req.body
   
    const sql = 'INSERT INTO customer  (name, location, country) VALUES (?, ?, ?)'

    connection.query(sql, [name, location, country], (error, results) => {
        if (error) res.send(error)
        res.send(results)
    })
})



app.listen(3000, () => {
    console.log('server listening on port 3000')
})