const router = require("express").Router();
const multer = require("multer");
const Item = require("../Model/item");

router.get("/", async (req, res) => {
  try {
    const id = req.header("token");

    const getItem = await Item.find({ store: id });
    // const getItem = await Item.find();
    res.status(200).json(getItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getItem = await Item.findById(req.params.id);
    res.status(201).json(getItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // return cb(null, "./uploads/");
    return cb(null, "../public/");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const id = req.header("token");
    const { productname, price, stock } = req.body;
    const image = req.file.filename;
    const addItem = await new Item({ image, productname, price, stock, store: id }).save();
    // const addItem = await new Item(req.body).save();
    res.status(201).json(addItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delItem = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json(delItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
