const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = ["./src/routes/index.routes.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "TODO REST_API",
    description: "API para gerenciar tarefas",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    Todo: {
      id: "5f9f5b9b9b9b9b9b9b9b9b9b",
      title: "Estudar",
      description: "Estudar NodeJS",
      done: false,
    },
    User: {
      id: "5f9f5b9b9b9b9b9b9b9b9b9b",
      name: "João",
      email: "admin@amdin.com",
      password: "123456",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Arquivo gerado com sucesso!");
});
