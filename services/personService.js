const Person = require("../models/person");

async function createPerson({ per }) {
  try {
    await Person.create(per);
    return [201, { message: "Pessoa cadastrada no sistema com sucesso!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllPersons() {
  try {
    const result = await Person.find();
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getPersonById({ id }) {
  try {
    const result = await Person.findById(id);
    if (result === null) return [404, { message: "Nenhuma pessoa encontrado por essa Id!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updatePersonById({ id, newPer }) {
  try {
    const result = await Person.updateOne({ _id: id }, newPer);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhuma pessoa encontrada para esse ID!" }];
    }
    return [200, { message: "Pessoa atualizada!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deletePersonById({ id }) {
  const per = await Person.findOne({ id });
  if (!per) return [422, { message: "Nenhuma pessoa encontrada para esse ID!" }];
  try {
    await per.deleteOne({ id });
    return [200, { message: "Pessoa excluida do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePersonById,
  deletePersonById,
};

module.exports = exports;
