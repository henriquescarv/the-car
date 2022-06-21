const Localization = require("../models/Localization");
const router = require("express").Router();

//Criação de dados:
router.post("/", async (req, res) => {
  const { latitude, longitude, carro } = req.body;
  const loc = { latitude, longitude, carro };

  try {
    await Localization.create(loc);
    res.status(201).json({ message: "Localização criada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const Loc = await Localization.find();
    res.status(200).json(Loc);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

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

// router.delete('/:id', async(req,res) => {
//     const id = req.params.id
//     const car = await Car.findOne({_id:id})

//     if(!car) {
//         res.status(422).json({message:"O carro não foi encontrado!"})
//         return
//     }

//     try {
//         await Car.deleteOne({_id:id})

//         res.status(200).json({message: 'Carro removido do sistema!'})
//     } catch(error) {
//         res.status(500).json({error: error})
//     }
// })

module.exports = router;

// https://dev.to/mkilmer/how-create-relationships-with-mongoose-and-node-js-with-real-example-43ei
