const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloudinary");
const Item = require("../Model/item");
const fs = require('fs');

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
    const token = req.header("token");
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const getItem = await Item.find({ store: verifiedToken?.id });
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

// router.post("/", upload.single("image"), async (req, res) => {
router.post("/", upload.array("image", 10), async (req, res) => {
  try {
    // if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: "No files uploaded" });

    const token = req.header("token");
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { productname, price, stock, description, category, costprice } = req.body;
    // const image = req.file.filename;

    // const productImage = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    const imageUrls = [];
    for (let file of req.files) {
      const productImage = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
      imageUrls.push(productImage.secure_url);

      // Delete the local file after uploading it to Cloudinary
      fs.unlinkSync(file.path);
    }

    const addItem = await new Item({ image: imageUrls, productname, description, category, price, costprice, stock, store: verify.id }).save();
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
