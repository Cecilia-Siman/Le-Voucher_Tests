"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.voucherCreateDataSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.voucherCreateDataSchema = joi_1["default"].object({
    code: joi_1["default"].string().required(),
    discount: joi_1["default"].number().min(1).max(100).required()
});
