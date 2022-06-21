const Person = require("../models/Person");
const router = require("express").Router();

//Criação de dados - create
router.post("/", async (req, res) => {
  //async para esperar alguma açao dentro da rota
  const { nome, cpf, cnh, email, contato, cartao } = req.body;
  const person = { nome, cpf, cnh, email, contato, cartao }; //Agora já temos todos os parâmetros necessarios definidos lá no Person.js

  try {
    //criando dados
    await Person.create(person);
    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//leitura de dados - read
router.get("/", async (req, res) => {
  try {
    const people = await Person.find(); //await serve para esperar todos os dados virem, antes de mandar a resposta
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //Lá no postman, precisamos colocar a url com o ID do user (que aparece no mongoDB)
  //extrair o dado da req. Quando vem pela URL, vem pelo req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id }); //para achar o usuário que possui o mesmo id da <const id = req.params.id>

    if (!person) {
      res.status(422).json({ message: "O usuário não foi encontrado!" }); //tratamento de erro
      return;
    }

    res.status(200).json(person); //pra mostrar os dados da pessoa encontrada
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//atualizaçao - update(put / patch)
router.patch("/:id", async (req, res) => {
  const id = req.params.id; //pra pegar o ID do usuário a ser alterado
  const { nome, cpf, cnh, email, contato, cartao } = req.body; //cria as variáveis em cima dos dados recebidos pela URL
  const person = {
    nome,
    cpf,
    cnh,
    email,
    contato,
    cartao,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "O usuário não foi encontrado!" }); //tratamento de erro (nao esta funcionando, vai direto pro 500)
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//excluir dados - delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id }); //para achar o usuário que possui o mesmo id da <const id = req.params.id>

  if (!person) {
    res.status(422).json({ message: "O usuário não foi encontrado!" }); //tratamento de erro
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário removido!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
