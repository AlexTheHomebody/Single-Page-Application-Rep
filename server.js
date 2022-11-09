const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const config = require('./config')[process.env.NODE_ENV||"dev"]
const PORT = config.port;

const client = new Client({
    connectionString: config.connectionString,
});
client.connect();

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
 
app.get('/',(req, res)=>{
    res.send('hello World');
});

app.get('/api/workers', (req, res)=>{
    client.query(`SELECT * FROM workers`)
    .then(result=>{
        res.send(result.rows)
    })
    .catch(e=> console.error(e.stack))
});

app.get('/api/departments', (req, res)=>{
    client.query(`SELECT * FROM departments`)
    .then(result =>{
        res.send(result.rows);
    })
    .catch(e=> console.error(e.stack))
});

app.post('/api/workers/',(req, res)=> {
    let newWorker = req.body;
    let first_name = newWorker.first_name;
    let last_name = newWorker.last_name;
    let depart_id = newWorker.depart_id;
    if (first_name && last_name && depart_id){
        client.query(`INSERT INTO workers(first_name, last_name, depart_id) VALUES('${first_name}','${last_name}',${depart_id}) RETURNING *`)
        .then(result=>{
            res.status(201).send(result.rows);
        })
        .catch(e=> console.error(e.stack));
    }else (
        res.status(500).send("ENTER FULL INFORMATION!!(first name, last name and department id)")
    )
});

app.patch('/api/workers/:id',(req, res)=>{
    let updatedWorker = req.body;
    let first_name = updatedWorker.first_name || '';
    let last_name = updatedWorker.last_name || '';
    let depart_id = updatedWorker.depart_id || -1;
    async function updateWorker(){
        try{
            const result = await client.query(`UPDATE workers SET
            first_name = COALESCE(NULLIF('${first_name}', ''), first_name), 
            last_name = COALESCE(NULLIF('${last_name}', ''), last_name),
            depart_id = COALESCE(NULLIF('${depart_id}', -1), depart_id)
            WHERE workers_id = ${req.params.id} RETURNING *`)
            res.send(result.rows);
        }catch(e){
            console.error(e.stack);
        }
    }
    updateWorker();
});

app.delete('/workers/:id',(req, res)=>{
    async function fireWorker(){
        try{
            const result = await client.query(`DELETE FROM workers WHERE workers_id = ${req.params.id}`)
            res.send(result.rows);
        } catch(e){
            console.error(e.stack);
        }
    }
    fireWorker();
});

app.listen(PORT, ()=>{
    console.log(`We are listening on ${PORT}`)
});