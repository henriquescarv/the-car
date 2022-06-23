const Localization = require("../models/Localization");

async function createLocation({ loc }) {
  try {
    await Localization.create(loc);
    return [201, { message: "Localização criada com sucesso." }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllLocations(res) {
  try {
    const Loc = await Localization.find();
    return [200, Loc];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getLocationById({ id }) {
  try {
    const Loc = await Localization.findById(id);
    if (Loc === null) return [404, { message: "Nenhuma localização encontrada por esse ID!" }];
    return [200, Loc];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updateLocationById({ id, newLoc }) {
  try {
    const result = await Localization.updateOne({ _id: id }, newLoc);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhuma localização encontrada para esse ID!" }];
    }
    return [200, { message: "Localização atualizada!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deleteLocationById({ id }) {
  const Loc = await Localization.findOne({ id });
  if (!Loc) return [422, { message: "Nenhuma localização encontrada para esse ID!" }];
  try {
    await Loc.deleteOne({ id });
    return [200, { message: "Localização excluida do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  createLocation,
  getLocationById,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
};

module.exports = exports;
