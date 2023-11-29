//config inicial
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cors = require("cors")


// inicia express
const app = express();


//forma de ler JSON / middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin:"*"
  })
)
app.use(express.json());

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const noteRoutes = require('./routes/noteRoutes')
app.use('/note',noteRoutes)


//rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar req
  res.json({ message: "Oi !!" });
});



//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hyg5kcl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado ao MongoDB");
    app.listen(2000);
  })
  .catch((err) => console.log(err));

  
