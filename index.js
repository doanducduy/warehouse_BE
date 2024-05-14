const config = require("./config");
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const common = require("./common_query");
const middleware = require("./middleware");
const user = require("./user_query");
const workpace = require("./workspace_query");
const plan = require("./plan_query");
const material = require("./material_query");
const AppError = require("./app_error");

app.use(cors());
app.use(helmet());

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

/*----- start common api--------*/
app.post("/api/v1/common/login", common.login);
/*----- end common api--------*/

/*----- start admin api--------*/
app.post("/api/v1/users", middleware.validateAdminToken, user.getListUsers);
app.post("/api/v1/users", middleware.validateAdminToken, user.detailUser);
app.post("/api/v1/users", middleware.validateAdminToken, user.deleteUser);
app.post("/api/v1/users", middleware.validateToken, user.updateUser);
app.post("/api/v1/users", middleware.validateAdminToken, user.addUser);

app.post("/api/v1/workspaces/get-list-workspaces", middleware.validateAdminToken, workpace.getListWorkspace);
app.post("/api/v1/workspaces/create-workspace", middleware.validateAdminToken, workpace.createWorkspace);
app.post("/api/v1/workspaces/update-workspace", middleware.validateAdminToken, workpace.updateWorkspace);
app.post("/api/v1/workspaces/delete-workspace", middleware.validateAdminToken, workpace.deleteWorkspace);
app.post("/api/v1/workspaces/get-detail-workspace", middleware.validateAdminToken, workpace.getWorkspaceById);
/*----- end admin api--------*/

app.post("/api/v1/plan/get-list-plan", middleware.validateAdminToken, plan.getListPlan);
app.post("/api/v1/plan/create-plan", middleware.validateAdminToken, plan.createPlan);
app.post("/api/v1/plans/delete-plan", middleware.validateAdminToken, plan.deletePlan);
app.post("/api/v1/plan/get-detail-plan", middleware.validateAdminToken, plan.getDetailPlan);
app.post("/api/v1/plan/get-detail-plan", middleware.validateAdminToken, plan.acceptTheProduct);

app.post("/api/v1/plans/get-list-task", middleware.validateToken, plan.getListTask);
app.post("/api/v1/plans/update-process", middleware.validateToken, plan.updateProcess);
app.post(
    "/api/v1/plans/report-process",
    middleware.validateToken,
    plan.reportProcess
);
app.post("/api/v1/material", middleware.validateAdminToken, material.getListMaterial);
app.post("/api/v1/material/import-request", middleware.validateAdminToken, material.importRequest);
app.post("/api/v1/material/approve-request", middleware.validateAdminToken, material.approveRequset);
app.post("/api/v1/material/get-list-request", middleware.validateToken, material.getListRequest);
app.post("/api/v1/material/get-list-approve", middleware.validateToken, material.getListApprove);
// Serve Swagger UI at /api-docs endpoint
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT;
app.set("port", PORT);

process.on("uncaughtException", function (err) {
    console.log("Uncaught exception: ", err);
    if (err instanceof AppError && err.isTrustedError()) {
        return;
    }
    process.exit(1);
});
/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(PORT);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${PORT}/`);
});
server.timeout = 300000;
