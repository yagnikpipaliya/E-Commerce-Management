const Admin = require("../Model/admin");
const Store = require("../Model/store");
const router = require("express").Router();

const express = require("express");
// const { Role } = require('../index');

const isAdmin = async (req, res, next) => {
  if (req.body.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

router.post("/", async (req, res) => {
  try {
    const newAdmin = await new Admin({ username: req.body.username, password: req.body.password, role: "admin" }).save();
    // const newAdmin = await new Admin(req.body).save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.use(express.json());
router.post("/login", async (req, res) => {
  try {
    console.log(`login ${req.body.role}`);
    if (req.body.role === "admin") {
      const response = await Admin.find(req.body);
      if (response) {
        return res.status(200).json({ message: "Login Successfully" });
      } else {
        return res.status(404).json({ message: "Invalid credentials!" });
      }
      // response != null ? res.status(200).json({message: 'Login Successfully'}) : res.status(404).json({message: 'User not found!'})
    }
    if (req.body.role === "store") {
      const response = await Store.findOne({ username: req.body.username, password: req.body.password });
      console.log(response);
      if (response) {
        return res.status(200).json({ message: "Login Successfully", token: response._id, user: response.username });
      } else {
        return res.status(404).json({ message: "Invalid credentials!" });
      }
      // response ? res.status(200).json({message: 'Login Successfully'}) : res.status(404).json({message: 'User not found!'})
    }
    res.status(400).json({ message: "Invalid data!" });
    // res.status(400).json({ message: 'Invalid data'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/store", async (req, res) => {
  try {
    const getStore = await Store.find();
    res.status(201).json(getStore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/store/:id", async (req, res) => {
  try {
    const getStore = await Store.findById(req.params.id);
    res.status(201).json(getStore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/createstore", async (req, res) => {
  try {
    const newStore = await new Store({ username: req.body.username, password: req.body.password, gst: req.body.gst }).save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/updatestore/:id", async (req, res) => {
  try {
    // FInd the note to be updated and update it
    // let store = await Store.findById(req.params.id);
    // if (!store) {
    //   return res.status(400).send("Not Found");
    // }
    // const updateStore = { username: req.body.username, password: req.body.password, gst: req.body.gst};
    const store = await Store.findByIdAndUpdate(req.params.id, { username: req.body.username, password: req.body.password, gst: req.body.gst}, { new: true });
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/deletestore/:id", async (req, res) => {
  try {
    const deleteStore = await Store.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.post("/",Role(), async (req, res) => {
//   const newUser = await new User({ username: req.body.username, password: req.body.password, role:req.body.role }).save();
//   res.status(201).json(newUser);
// });

module.exports = router;
// module.exports = {
//   adminRoutes: router,
//   restaurantRoutes: router,
// };
