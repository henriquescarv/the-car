const Car = require("../models/Car");
const Localization = require("../models/Localization");
const router = require("express").Router();

// Criar Localização
router.post("/", async (req, res) => {
  const { latitude, longitude, carro } = req.body;
  const loc = { latitude, longitude, carro };

  try {
    // ver se existe o carro e se ele já não tem uma localização
    let haveCarId = await Car.findById(loc.carro);
    if (!haveCarId) res.status(400).json({ message: "Carro não encontrado." });

    await Localization.create(loc);
    res.status(201).json({ message: "Localização criada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Pegar todas localizações
router.get("/", async (req, res) => {
  try {
    const Loc = await Localization.find();
    res.status(200).json(Loc);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Pegar por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const loc = await Localization.findOne({ _id: id });

    if (!loc) {
      res.status(422).json({ message: "Nenhuma localização encontrada" }); //tratamento de erro
      return;
    }

    res.status(200).json(loc);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { latitude, longitude, carro } = req.body;
  const loc = { latitude, longitude, carro };

  try {
    const updatedLoc = await loc.updateOne({ _id: id }, loc);
    if (updatedLoc.matchedCount === 0) {
      res
        .status(422)
        .json({ message: "Nenhuma localização encontrada para esse ID!" });
      return;
    }
    res.status(200).json(loc);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const Loc = await Localization.findOne({ _id: id });

  if (!Loc) {
    res.status(422).json({ message: "A localização não foi encontrada!" });
    return;
  }

  try {
    await Loc.deleteOne({ _id: id });
    res.status(200).json({ message: "Localização foi do sistema!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
