// ✅ 1. Import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ 2. Create app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serves your HTML, CSS, JS files

// ✅ 3. Connect to MongoDB
mongoose.connect("mongodb+srv://sangameshnidode58:bhagya%40123@cluster0.thl4hyx.mongodb.net/mydata?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// ✅ 4. DEFINE YOUR MODEL HERE (this is where your line goes!)
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String
}));

// ✅ 5. API route to save data
app.post("/submit", async (req, res) => {
  try {
    const user = new User(req.body); // create a new document
    await user.save();               // save it to MongoDB
    res.send("✅ Data saved successfully to MongoDB!");
  } catch (error) {
    console.error("❌ Detailed Error:", error);
    res.status(500).send("❌ Error saving data: " + error.message);
  }
});

// ✅ 6. API route to view all data
app.get("/data", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ 7. Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
