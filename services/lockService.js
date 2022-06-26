const Lock = require("../models/Lock");

async function createLock({ lock }) {
    try {
      await Lock.create(lock);
      return [201, { message: "Carro travado!." }];
    } catch (error) {
      return [500, { error: error.message }];
    }
  }

async function getAllLocks(res) {
  try {
    const Lock = await Lock.find();
    return [200, Lock];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getLockById({ id }) {
    try {
      const Lock = await Lock.findById(id);
      if (Lock === null) return [404, { message: "Nenhuma trava com esse ID!" }];
      return [200, Lock];
    } catch (error) {
      return [500, { error: error.message }];
    }
  }

async function updateLockById({ id, newLock }) {
  try {
    const result = await Lock.updateOne({ _id: id }, newLock);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhuma trava encontrada com esse ID!" }];
    }
    return [200, { message: "Trava atualizada!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}
  
async function deleteLockById({ id }) {
    const Lock = await Lock.findOne({ id });
    if (!Lock) return [422, { message: "Nenhuma trava encontrada com esse ID!" }];
    try {
      await Lock.deleteOne({ id });
      return [200, { message: "Trava excluida do sistema!" }];
    } catch (error) {
      return [500, { error: error.message }];
    }
  }

var exports = {
  createLock,
  getLockById,
  getAllLocks,
  getLockById,
  updateLockById,
  deleteLockById,
};

module.exports = exports;
  