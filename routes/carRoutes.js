const {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
} = require("../services/carService");

const router = require("express").Router();

// Criar Carro
router.post("/", async (req, res) => {
  const car = ({ placa, ano, modelo, aluguel } = req.body);
  const result = await createCar({ car });
  res.status(result[0]).json(result[1]);
});

// Pegar todos carros
router.get("/", async ({ res }) => {
  const result = await getAllCars();
  res.status(result[0]).json(result[1]);
});

// Pegar carro by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getCarById({ id });
  res.status(result[0]).json(result[1]);
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newCar = ({ placa, ano, modelo, aluguel } = req.body);
  const result = await updateCarById({ id, newCar });
  res.status(result[0]).json(result[1]);
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteCarById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
