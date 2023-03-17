"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var voucherRouter_1 = __importDefault(require("./voucherRouter"));
var router = (0, express_1.Router)();
router.use(voucherRouter_1["default"]);
exports["default"] = router;
