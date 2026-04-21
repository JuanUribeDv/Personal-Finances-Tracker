import 'dotenv/config';
import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
const app = express();
app.use(json()); 
app.use(cors());


const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    process.exit(1); 
  } else {
    console.log('Conectado a MySQL');
  }
});


const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// Rutas de my debts 
app.post('/api/debts', (req, res) => {
  const { dueño, cantidad2, descripcion } = req.body;
  const query = 'INSERT INTO debts ( dueño, cantidad2, descripcion) VALUES (?, ?, ?)';
  db.query(query, [ dueño, cantidad2, descripcion], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'Debt saved', id: result.insertId });
    }
  });
});

app.get('/api/debts', (req, res) => {
  const query = 'SELECT * FROM debts';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.delete('/api/debts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM debts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Debt deleted' });
    }
  });
});

app.put('/api/debts/:id', (req, res) => {
  const { id } = req.params;
  const { dueño, cantidad2, descripcion } = req.body;
  const query = 'UPDATE debts SET dueño = ?, cantidad2 = ?, descripcion = ? WHERE id = ?';
  db.query(query, [dueño, cantidad2, descripcion, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Debt updated' });
    }
  });
});

// Rutas de debtors 
app.post('/api/debtors', (req, res) => {
  const { nombre, cantidad1 } = req.body;
  const query = 'INSERT INTO debtors ( nombre, cantidad1) VALUES (?, ?)';
  db.query(query,  [nombre, cantidad1], (err, result) => {
    if (err){
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'Debtor saved', id: result.insertId });
    }
  
  });
});

app.get('/api/debtors', (req, res) => {
  const query = 'SELECT * FROM debtors';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.delete('/api/debtors/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM debtors WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Debtor deleted' });
    }
  });
});

app.put('/api/debtors/:id', (req, res)=> {
  const { id } = req.params;
  const {nombre, cantidad1} = req.body;
  const query = 'UPDATE debtors SET nombre = ?, cantidad1 = ? WHERE id = (?)';
  db.query(query, [nombre, cantidad1, id], (err, result)=>{
    if (err){
      res.status(500).json({error: err});
    }else{
      res.json({message: 'debtor updated'});
    }
  });
});


//Rutas de projects
app.post('/api/projects', (req, res)=>{
  const {nombre_proy, descripcion} = req.body;
  const query = 'INSERT into projects (nombre_proy, descripcion) VALUES(?, ?)';
  db.query(query, [nombre_proy, descripcion], (err, result)=>{
    if (err){
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'Project saved', id: result.insertId });
    }
  });
});

app.get('/api/projects', (req, res)=>{
  const query = 'SELECT * FROM projects'
  db.query(query, (err, results)=>{
    if(err){
      res.status(500).json({ error: err});
    } else{
      res.json(results);
    }
  });
});

app.delete('/api/projects/:id', (req, res)=>{
  const { id } =req.params;
  const query = 'DELETE FROM projects WHERE id = ?';
  db.query(query, [id], (err, results)=>{
    if (err){
      res.status(500).json({error:err});
    } else{
      res.json({message: 'project deleted'});
    }
  });

});

app.put('/api/projects/:id', (req, res)=> {
  const { id } = req.params;
  const { nombre_proy, descripcion} = req.body;
  const query = 'UPDATE projects SET nombre_proy= ?, descripcion = ? WHERE id = ?';
  db.query(query, [nombre_proy, descripcion, id], (err,result)=>{
    if(err){
      res.status(500).json({error:err});
    }else{
      res.json({message: 'projects updated'});
    }
  });
});

//rutas savings

app.post('/api/savings', (req, res)=>{
  const { cantidad3, nombre_ahorro} = req.body;
  const query = 'INSERT INTO savings (cantidad3, nombre_ahorro) VALUES (?, ?)';
  db.query(query, [cantidad3, nombre_ahorro], (err,result)=>{
    if (err){
      res.status(500).json({error:err});
    }else{
      res.json({message: 'saving saved', id: result.insertId});
    }
  });
});

app.get('/api/savings', (req, res) =>{
  const query = 'SELECT * FROM savings';
  db.query(query, (err, results)=>{
    if(err){
      res.status(500).json({error: err});
    }else{
      res.json(results);
    }
  });
});

app.delete('/api/savings/:id', (req, res)=>{
  const {id}= req.params;
  const query = 'DELETE FROM savings WHERE id = ?';
  db.query(query, [id], (err, results)=>{
    if (err){
      res.status(500).json({error: err});
    }else{
      res.json({message: 'savings deleted correctly'});
    }
  });
});

app.put('/api/savings/:id', (req, res)=>{
  const { id }= req.params;
  const {cantidad3, nombre_ahorro} = req.body;
  const query = 'UPDATE savings SET cantidad3 = ?, nombre_ahorro = ? WHERE id = ?';
  db.query(query, [cantidad3, nombre_ahorro, id], (err, results)=>{
    if(err){
      res.status(500).json({error: err});
    }else{
      res.json({message: 'saving updated'});
    }
  });
});

//rutas del dashboard-income
app.post('/api/income', (req, res)=>{
  const {cantidad4} = req.body;
  const query ='INSERT INTO incomes (cantidad4) VALUES (?)';
  db.query(query, [cantidad4], (err, results)=>{
    if (err){
      res.status(500).json({error: err});
    }else{
      res.json({message: 'income saved'});
    }
  });
});

app.get('/api/income', (req, res)=>{
  const query ='SELECT * FROM incomes';
  db.query(query, (err, results)=>{
    if(err){
      res.status(500).json({error: err});
    }else{
      res.json(results);
    }
  });
});
//rutas del dashboard-expenses
app.post('/api/expense', (req, res)=>{
  const {cantidad5} = req.body;
  const query ='INSERT INTO expenses (cantidad5) VALUES (?)';
  db.query(query, [cantidad5], (err, results)=>{
    if (err){
      res.status(500).json({error: err});
    }else{
      res.json({message: 'expense saved'});
    }
  });
});

app.get('/api/expense', (req, res)=>{
  const query = 'SELECT * FROM expenses';
  db.query(query, (err, results)=>{
    if (err){
      res.status(500).json({error: err});
    }else{
      res.json(results);
    }
  });
});