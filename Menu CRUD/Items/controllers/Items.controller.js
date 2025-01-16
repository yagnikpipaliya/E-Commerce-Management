const Item = require("../../Model/item");

const getAll = async function (req, res) {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const singleItem = await item.findById(id);
    if (!singleItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(singleItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll, getById };