const express = require("express");
const server = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const routes = require("./src/routes/index.routes");
const swaggerDocument = require("./src/docs/swagger_output.json");

const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/api/v1", routes);
server.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  console.log(
    "api docs is running on http://localhost:" + PORT + "/api/v1/docs"
  );
});
