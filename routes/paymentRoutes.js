const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../services/paymentService");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const pay = ({ price, credit_card, reserva_id } = req.body);
  const result = await createPayment({ pay });
  res.status(result[0]).json(result[1]);
});

router.get("/", async ({ res }) => {
  const result = await getAllPayments();
  res.status(result[0]).json(result[1]);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getPaymentById({ id });
  res.status(result[0]).json(result[1]);
});

router.patch("/efetuar/:id", async (req, res) => {
  const id = req.params.id;
  const newPay = { definitive: true };
  const result = await updatePaymentById({ id, newPay });
  res.status(result[0]).json(result[1]);
});

// Atualizar por ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newPay = ({ price, credit_card, reserva_id } = req.body);
  const result = await updatePaymentById({ id, newPay });
  res.status(result[0]).json(result[1]);
});

// Apagar por ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deletePaymentById({ id });
  res.status(result[0]).json(result[1]);
});

module.exports = router;
