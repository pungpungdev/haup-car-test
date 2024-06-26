const mySqlPool = require("../config/db");

const getAllCar = async (req, res) => {
  try {
    const {searchText} = req.query
    console.log(req.query)
    
    const queryText = `SELECT * FROM all_cars2 
        WHERE (is_del IS NULL OR is_del <> ?) and (
            CASE WHEN ? IS NULL THEN TRUE
                ELSE CONCAT(IFNULL(registration,''),IFNULL(brand,''),IFNULL(model,''),IFNULL(remark,'')) LIKE CONCAT('%',?,'%')
            END
        )`;
    const data = await mySqlPool.query(queryText, ["Y", searchText, searchText]);
    if (data) {
      res.status(200).json(data[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get all car api",
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const targetId = req.params.id;
    const queryText = "SELECT * FROM all_cars2 WHERE id = ?";
    const data = await mySqlPool.query(queryText, [targetId]);
    if (data) {
      res.status(200).json(data[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get car by id api",
    });
  }
};

const createCar = async (req, res) => {
  try {
    const { registration, brand, model, description, remark } = req.body;
    const queryText =
      "INSERT INTO all_cars2 (registration, brand, model, description, remark) VALUES (?, ?, ?, ?, ?)";
    const data = await mySqlPool.query(queryText, [
      registration,
      brand,
      model,
      description,
      remark,
    ]);
    if (data) {
      res.status(200).send({
        message: "car created",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in create car api",
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const targetId = req.params.id;
    const { registration, brand, model, description, remark } = req.body;
    const queryText =
      "UPDATE all_cars2 SET registration = ?, brand = ?, model = ?, description = ?, remark = ? WHERE id = ?";
    const data = await mySqlPool.query(queryText, [
      registration,
      brand,
      model,
      description,
      remark,
      targetId,
    ]);
    if (data) {
      res.status(200).send({
        message: "car updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update car api",
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const targetId = req.params.id;
    const queryText = "UPDATE all_cars2 SET is_del = ? WHERE id = ?";
    const data = await mySqlPool.query(queryText, ["Y", targetId]);
    if (data) {
      res.status(200).send({
        message: "car deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete car api",
    });
  }
};

module.exports = {
  getAllCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
