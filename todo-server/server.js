const express = require("express");
const server = express();
const routes = require("./src/routes/index.routes");

const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/v1", routes);

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
