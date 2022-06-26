const {
    createLock,
    getAllLocks,
    getLockById,
    updateLockById,
    deleteLockById,
  } = require("../services/lockService");

const router = require("express").Router();

//Create
router.post("/", async (req, res) => {
    const lock = ({ trava, reserva } = req.body);
    const result = await createLock({ lock });
    res.status(result[0]).json(result[1]);
  });

//Get all
router.get("/", async ({ res }) => {
    const result = await getAllLocks();
    res.status(result[0]).json(result[1]);
  });

//Get one
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await getLockById({ id });
    res.status(result[0]).json(result[1]);
  });

//Patch
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const newLock = ({ trava, reserva } = req.body);
    const result = await updateLockById({ id, newLock });
    res.status(result[0]).json(result[1]);
  });

//Delete
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteLockById({ id });
    res.status(result[0]).json(result[1]);
  });

module.exports = router;