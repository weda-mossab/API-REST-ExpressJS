"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("./book"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, serve_static_1.default)("Public"));
app.use((0, cors_1.default)());
const uri = "mongodb://localhost:27017/biblio";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongo db connection sucess");
    }
});
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/books", (req, res) => {
    book_1.default.find((err, books) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(books);
        }
    });
});
app.get("/books/:id", (req, res) => {
    book_1.default.findById(req.params.id, (err, books) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(books);
        }
    });
});
app.post("/books", (req, res) => {
    let book = new book_1.default(req.body);
    book.save(err => {
        if (err) {
            res.status(500).send(err);
        }
        else
            res.send(book);
    });
});
app.put("/books/:id", (req, res) => {
    book_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send("successfly updated book");
        }
    });
});
app.delete("/books/:id", (req, res) => {
    book_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send("successfly deleted book");
        }
    });
});
app.get("/pbooks", (req, res) => {
    var _a, _b;
    let p = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || "1");
    let size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || "5");
    book_1.default.paginate({}, { page: p, limit: size }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else
            res.send(result);
    });
});
/* http://localhost:8708/books-search?search=J&page=0&size=5 */
app.get("/books-search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let p = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || "1");
    let size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || "5");
    let keyword = req.query.search || '';
    yield book_1.default.paginate({}, { page: p, limit: size }, (err, books) => {
        if (err) {
            res.status(500).send(err);
        }
        else
            res.send(books);
    });
}));
app.listen(8708, () => {
    console.log("server started on port %d", 8708);
});
module.exports = app;
//# sourceMappingURL=index.js.map