"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.voucherUseDataSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.voucherUseDataSchema = joi_1["default"].object({
    code: joi_1["default"].string().required(),
    amount: joi_1["default"].number().min(0).required()
});
