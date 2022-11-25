const express = require("express");
const server = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");

const ROOT_FOLDER = path.join(__dirname, "./src");

const routes = require("./src/routes/index.routes");
const swaggerDocument = require("./src/docs/swagger_output.json");
const options = {
  customCssUrl: "/swagger-ui.css",
  customSiteTitle: "ToDo API",
};

const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static(path.join(ROOT_FOLDER, "public")));

server.use("/api/v1", routes);

server.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  console.log(
    "api docs is running on http://localhost:" + PORT + "/api/v1/docs"
  );
});
