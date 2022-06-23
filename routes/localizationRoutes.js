const {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
} = require("../services/locationService");

const router = require("express").Router();

// Criar Localização
router.post("/", async (req, res) => {
  const loc = ({ latitude, longitude, carro } = req.body);
  const result = await createLocation({ loc });
  res.status(result[0]).json(result[1]);
});

// Pegar todas localizações
router.get("/", async ({ res }) => {
  const result = await getAllLocations();
  res.status(result[0]).json(result[1]);
});

// Pegar por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getLocationById({ id });
  res.status(result[0]).json(result[1]);
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newLoc = ({ latitude, longitude, carro } = req.body);
  const result = await updateLocationById({ id, newLoc });
  res.status(result[0]).json(result[1]);
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteLocationById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
