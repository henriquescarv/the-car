const Car = require("../models/Car");

async function createCar({ car }) {
  try {
    await Car.create(car);
    return [201, { message: "Carro cadastrado no sistema com sucesso!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllCars() {
  try {
    const result = await Car.find();
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getCarById({ id }) {
  try {
    const result = await Car.findById(id);
    if (result === null) return [404, { message: "Nenhum carro encontrado por esse Id!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updateCarById({ id, newCar }) {
  try {
    const result = await Car.updateOne({ _id: id }, newCar);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhum carro encontrado para esse ID!" }];
    }
    return [200, { message: "Carro atualizado!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteCarById({ id }) {
  const car = await Car.findOne({ id });
  if (!car) return [422, { message: "Nenhum carro encontrado para esse ID!" }];
  try {
    await car.deleteOne({ id });
    return [200, { message: "Carro excluido do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
};

module.exports = exports;
