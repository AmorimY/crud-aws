//config inicial
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const app = express();


//forma de ler JSON / middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar req
  res.json({ message: "Oi !!" });
});

//rQ2gc0sz8b735bm4
//mongodb+srv://rafael:rQ2gc0sz8b735bm4@cluster0.hyg5kcl.mongodb.net/
//mongodb+srv://rafael:rQ2gc0sz8b735bm4>@cluster0.hyg5kcl.mongodb.net/?retryWrites=true&w=majority
//entregar uma porta
mongoose
  .connect(
    "mongodb+srv://rafael:rQ2gc0sz8b735bm4@cluster0.hyg5kcl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectado ao MongoDB");
    app.listen(2000);
  })
  .catch((err) => console.log(err));

