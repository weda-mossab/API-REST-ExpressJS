"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});
bookSchema.plugin(mongoose_paginate_1.default);
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
//# sourceMappingURL=book.js.map