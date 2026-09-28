const express = require("express");
const sequelize = require("./db");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/expenses", expenseRoutes);
async function startServer() { try { await sequelize.authenticate(); console.log("Database connected successfully"); await sequelize.sync(); console.log("Tables created successfully"); app.listen(3000, () => console.log("Server running on port 3000")); } catch (error) { console.log("Failed to start server:", error.message); } } startServer();
