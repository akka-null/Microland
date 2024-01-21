"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// depends
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
// import csrfProtection from "csurf";
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// routes
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const shopRoute_1 = __importDefault(require("./routes/shopRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3050;
const app = (0, express_1.default)();
// compression
app.use((0, compression_1.default)());
// middlewares
app.use((0, helmet_1.default)());
// TODO: *read if you should use csrf like this 
// app.use(csrfProtection()); //WARN: * user CSRF if you use stripe or chargily
// TODO: * read if you should use cors like this or make our api be consumed only the frontend app
//       * learn more about cors
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)());
// using routes
app.use("/admin", adminRoute_1.default);
app.use(shopRoute_1.default);
app.use(authRoute_1.default);
app.get("/", (_req, res) => {
    res.status(200).json({ msg: "hey akka" });
});
mongoose_1.default
    .connect(process.env.URI)
    .then((_connection) => {
    app.listen(PORT, () => {
        // console.log(`your app is listenning or port:${PORT}...`);
        console.log(`your app is running on: http://localhost:${PORT}`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map