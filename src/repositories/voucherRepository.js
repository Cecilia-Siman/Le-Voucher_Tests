"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var database_1 = __importDefault(require("../config/database"));
function getVoucherByCode(code) {
    return database_1["default"].voucher.findUnique({
        where: { code: code }
    });
}
function createVoucher(code, discount) {
    return database_1["default"].voucher.create({
        data: { code: code, discount: discount }
    });
}
function useVoucher(code) {
    return database_1["default"].voucher.update({
        where: { code: code },
        data: { used: true }
    });
}
exports["default"] = {
    getVoucherByCode: getVoucherByCode,
    createVoucher: createVoucher,
    useVoucher: useVoucher
};
