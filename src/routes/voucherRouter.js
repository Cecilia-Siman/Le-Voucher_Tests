"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var voucherController_1 = __importDefault(require("../controllers/voucherController"));
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var voucherCreateData_1 = require("../schemas/voucherCreateData");
var voucherUseData_1 = require("../schemas/voucherUseData");
var voucherRouter = (0, express_1.Router)();
voucherRouter.post("/vouchers", (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(voucherCreateData_1.voucherCreateDataSchema), voucherController_1["default"].createVoucher);
voucherRouter.post("/vouchers/apply", (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(voucherUseData_1.voucherUseDataSchema), voucherController_1["default"].applyVoucher);
exports["default"] = voucherRouter;
