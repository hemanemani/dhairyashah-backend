"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const profile_1 = __importDefault(require("./routes/api/admin/profile"));
const upload_1 = __importDefault(require("./routes/api/admin/upload"));
const message_1 = __importDefault(require("./routes/api/admin/message"));
const login_1 = __importDefault(require("./routes/api/admin/login"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://www.shahdhairya.in",
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/admin/login", login_1.default);
app.use("/api/admin/profile", profile_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/admin/upload", upload_1.default);
app.use("/api/admin/message", message_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log("server running on port 5000");
});
