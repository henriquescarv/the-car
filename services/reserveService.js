const Reserve = require("../models/Reserve");

async function createReserve({ rsv }) {
  try {
    let initPeriod = new Date(rsv.initPeriod);
    let endPeriod = new Date(rsv.endPeriod);

    let diferenceHours = (endPeriod - initPeriod) / 3600000;
    if (diferenceHours < 2 || diferenceHours > 6) {
      return [400, { message: "Período de tempo não permetido!" }];
    }

    let allReserveCar = await Reserve.find({ car_id: rsv.car_id });
    for (let reserve of allReserveCar) {
      let rsvInitDate = new Date(reserve.initPeriod);
      let rsvEndDate = new Date(reserve.endPeriod);
      if (rsvInitDate <= initPeriod && rsvEndDate >= initPeriod) {
        return [400, { message: "Já há uma reserva com esse carro nesse período!" }];
      }
    }

    await Reserve.create(rsv);
    return [201, { message: "Reserva cadastrada no sistema com sucesso!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllReserves() {
  try {
    const result = await Reserve.find();
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getReserveById({ id }) {
  try {
    const result = await Reserve.findById(id);
    if (result === null) return [404, { message: "Nenhuma reserva encontrada por esse Id!" }];
    console.log("res", new Date(result.initPeriod));
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getReserveByPersonId({ personId }) {
  try {
    const result = await Reserve.find({ person_id: personId });
    if (result.length === 0)
      return [404, { message: "Nenhuma reserva encontrada para essa pessoa!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getReserveByCarId({ carId }) {
  try {
    const result = await Reserve.find({ car_id: carId });
    if (result.length === 0)
      return [404, { message: "Nenhuma reserva encontrada para esse carro!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updateReserveById({ id, newRsv }) {
  try {
    const result = await Reserve.updateOne({ _id: id }, newRsv);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhuma reserva encontrada para esse ID!" }];
    }
    return [200, { message: "Reserva atualizada!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteReserveById({ id }) {
  const rsv = await Reserve.findOne({ id });
  if (!rsv) return [422, { message: "Nenhuma reserva encontrada para esse ID!" }];
  try {
    await rsv.deleteOne({ id });
    return [200, { message: "Reserva excluida do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  createReserve,
  getAllReserves,
  getReserveById,
  getReserveByPersonId,
  getReserveByCarId,
  updateReserveById,
  deleteReserveById,
};

module.exports = exports;
