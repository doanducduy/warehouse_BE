const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

// Swagger options
const swaggerOptions = {
    info: {
        version: "1.0.0",
        title: "CanhDong Warehouse API",
        description: "APIs for CanhDong Warehouse",
    },
    servers: [
        // {
        //   url: "https://",
        //   description: "Production server",
        // },
        {
            url: "http://localhost:8088",
            description: "Development server",
        },
    ],
    basePath: "",
    schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
    console.log("Swagger file created");
});
