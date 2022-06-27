const {
  createReserve,
  getAllReserves,
  getReserveById,
  getReserveByPersonId,
  getReserveByCarId,
  updateReserveById,
  deleteReserveById,
  getVerifyReserveActive,
} = require("../services/reserveService");

const router = require("express").Router();

// Criar reserva
router.post("/", async (req, res) => {
  const rsv = ({ person_id, car_id, period } = req.body);
  const result = await createReserve({ rsv });
  res.status(result[0]).json(result[1]);
});

// Pegar todas reservas
router.get("/", async ({ res }) => {
  const result = await getAllReserves();
  res.status(result[0]).json(result[1]);
});

// Pegar reserva by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getReserveById({ id });
  res.status(result[0]).json(result[1]);
});

// Pegar reserva by person id
router.get("/person/:id", async (req, res) => {
  const personId = req.params.id;
  const result = await getReserveByPersonId({ personId });
  res.status(result[0]).json(result[1]);
});

// Verificar se a reserva da pessoa esta ativada no momento
router.get("/:id/active", async (req, res) => {
  const id = req.params.id;
  const result = await getVerifyReserveActive({ id });
  res.status(result[0]).json(result[1]);
});

// Pegar reserva by car id
router.get("/car/:id", async (req, res) => {
  const carId = req.params.id;
  const result = await getReserveByCarId({ carId });
  res.status(result[0]).json(result[1]);
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newRsv = ({ person_id, car_id, period } = req.body);
  const result = await updateReserveById({ id, newRsv });
  res.status(result[0]).json(result[1]);
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteReserveById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
