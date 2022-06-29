const Lock = require("../models/Lock");
const axios = require("axios").default;

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
    const lock = await Lock.find();
    return [200, lock];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getLockById({ id }) {
  try {
    const lock = await Lock.findById(id);
    if (lock === null) return [404, { message: "Nenhuma trava com esse ID!" }];
    return [200, lock];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function unlockByReserveId({ reserveId }) {
  try {
    reserveActive = await axios.get(
      "http://localhost:3000/reserve/" + reserveId + "/active"
    );

    if (reserveActive.status === 200) {
      const result = await Lock.updateOne(
        { reserva_id: reserveId },
        { trava: true }
      );
      if (result.matchedCount === 0) {
        return [422, { message: "Nenhuma trava encontrada com esse ID!" }];
      }
      return [200, { message: "Trava atualizada!" }];
    } else {
      return [400, { message: "Essa reserva não está ativa no momento." }];
    }
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
  const lock = await Lock.findOne({ id });
  if (!lock) return [422, { message: "Nenhuma trava encontrada com esse ID!" }];
  try {
    await lock.deleteOne({ id });
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
  unlockByReserveId,
};

module.exports = exports;
