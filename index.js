// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//config para ler JSON (com middlewares)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const carRoutes = require("./routes/carRoutes");
app.use("/car", carRoutes);

const localizationRoutes = require("./routes/localizationRoutes");
app.use("/localization", localizationRoutes);

const reserveRoutes = require("./routes/reserveRoutes");
app.use("/reserve", reserveRoutes);

const lockRoutes = require("./routes/lockRoutes");
app.use("/lock", lockRoutes);

//rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar requisição
  res.json({ message: "Hello, world!" });
});

// entregar uma porta para acessar
const DB_USER = "backend_ine";
const DB_PASSWORD = encodeURIComponent("M1SDHitSMaW0obNi");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.sepu260.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(3000);
  }) //pra caso a conexão dê certo
  .catch((err) => console.log(err)); // pra exibir mensagem de erro, em caso de erro
