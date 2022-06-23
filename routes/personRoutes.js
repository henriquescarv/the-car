const {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePersonById,
  deletePersonById,
} = require("../services/personService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const per = ({ nome, cpf, cnh, email, contato, cartao } = req.body);
  const result = await createPerson({ per });
  res.status(result[0]).json(result[1]);
});

//leitura de dados - read
router.get("/", async ({ res }) => {
  const result = await getAllPersons();
  res.status(result[0]).json(result[1]);
});

// Pegar por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getPersonById({ id });
  res.status(result[0]).json(result[1]);
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newPer = ({ nome, cpf, cnh, email, contato, cartao } = req.body);
  const result = await updatePersonById({ id, newPer });
  res.status(result[0]).json(result[1]);
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deletePersonById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
