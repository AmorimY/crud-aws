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
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const entriesRoutes = require('./routes/entriesRoutes')
app.use('/entries', entriesRoutes)

const noteRoutes = require('./routes/noteRoutes')
app.use('/note',noteRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/product',productRoutes)


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
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.8qr1w31.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado ao MongoDB");
    app.listen(2000);
  })
  .catch((err) => console.log(err));

  
