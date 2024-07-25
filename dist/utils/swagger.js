"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const { version } = require("../../package.json");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Microland Rest Api',
            version
        }
    },
    apis: ['./serverLand/routes/*.ts', './serverLand/models/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.use('/akka', (req, res) => {
        console.log('akka');
        res.send('akka');
    });
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-type', 'Application/json');
        res.send(swaggerSpec);
    });
    console.log(`Docs in : http://localhost:${port}/docs`);
};
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map