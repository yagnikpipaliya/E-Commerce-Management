const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloudinary");
const Item = require("../Model/item");

// router.get("/products", async (req, res) => {
//   try {
//       console.log("get all items");
//       const items = await Item.find();
//       res.status(200).json(items);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// });
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
      return res.status(400).json({ error: "No file uploaded" });
    }
    const id = req.header("token");
    // const verify= jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzljY2EyYjA3NTk4ZWU3MzFjNDA2YiIsImlhdCI6MTcxODEyNTI0NH0.Adgg06RVIci1rHhq7uRiO2v18ZnVesL5Ras6nG6IDu4',process.env.JWT_SECRET_KEY)
    // console.log(verify)
    const { productname, price, stock } = req.body;
    const image = req.file.filename;
    const productImage = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    console.log(`req.files ${req.file.path} `);
    console.log(`productImage ${productImage.secure_url} `);
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
