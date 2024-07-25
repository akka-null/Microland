"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const shopRoute_1 = __importDefault(require("./routes/shopRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const shopController_1 = require("./controllers/shopController");
const errorhandler_1 = __importDefault(require("./middlewares/errorhandler"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3050;
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/orders/stripe/fulfill", (0, body_parser_1.raw)({ type: 'application/json' }), shopController_1.stripeFulfillOrder);
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res, _next) => {
    res.status(200).json({ msg: "hey akka", "@": `${req.hostname}` });
});
(0, swagger_1.default)(app, PORT);
app.use("/api", adminRoute_1.default);
app.use("/api", userRoute_1.default);
app.use("/api", shopRoute_1.default);
app.use("/api", authRoute_1.default);
app.use(notFound_1.default);
app.use(errorhandler_1.default);
mongoose_1.default
    .connect(process.env.URI)
    .then((_connection) => {
    app.listen(PORT, () => {
        console.log(`your app is listenning on http://localhost:${PORT}...`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map