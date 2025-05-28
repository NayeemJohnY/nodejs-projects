const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/app.js"];
const config = {}
swaggerAutogen(outputFile, endpointsFiles, config)