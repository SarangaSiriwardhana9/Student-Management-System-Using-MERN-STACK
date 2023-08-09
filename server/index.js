const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
  res.json({ message: "server is running 8090" });
});

const studentSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    address: String,
    grade: Number,
    class: String,
    homeMobile: String,
    motherName: String,
    fatherName: String,
    motherMobile: String,
    fatherMobile: String,
    isMotherEmployed: Boolean,
    motherEmployerName: String,
    motherJobPosition: String,
    isFatherEmployed: Boolean,
    fatherEmployerName: String,
    fatherJobPosition: String,
    hasSiblings: Boolean,
    sibling1Name: String,
    sibling2Name: String,
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("student", studentSchema);

// create data // save data to MongoDB
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new studentModel(req.body);
  await data.save();

  res.json({ success: true, message: "data saved successfully", data: data });
});
// Read - Fetch all data
app.get("/getData", async (req, res) => {
  try {
    const data = await studentModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;

  console.log(rest);
  const data = await studentModel.updateOne({ _id: _id }, rest);

  res.send({ success: true, message: "data updated successfully", data: data });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await studentModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});

mongoose
  .connect(
    "mongodb+srv://root:1234@cluster0.hp2dlnp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log("Server is running on port " + PORT));
  })
  .catch((err) => console.log(err));
