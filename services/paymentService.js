const Payment = require("../models/Payment");

async function createPayment({ pay }) {
  try {
    await Payment.create(pay);
    return [201, { message: "Pagamento cadastrado no sistema com sucesso!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getAllPayments() {
  try {
    const result = await Payment.find();
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function getPaymentById({ id }) {
  try {
    const result = await Payment.findById(id);
    if (result === null) return [404, { message: "Nenhum pagamento encontrado por esse Id!" }];
    return [200, result];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function updatePaymentById({ id, newPay }) {
  try {
    const result = await Payment.updateOne({ _id: id }, newPay);
    if (result.matchedCount === 0) {
      return [422, { message: "Nenhum pagamento encontrado para esse ID!" }];
    }
    return [200, { message: "Pagamento atualizado!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

async function deletePaymentById({ id }) {
  const car = await Payment.findOne({ id });
  if (!car) return [422, { message: "Nenhum pagamento encontrado para esse ID!" }];
  try {
    await car.deleteOne({ id });
    return [200, { message: "Pagamento excluido do sistema!" }];
  } catch (error) {
    return [500, { error: error.message }];
  }
}

var exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};

module.exports = exports;
