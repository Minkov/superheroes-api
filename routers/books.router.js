/* globals require module */

const express = require("express");

const Book = require("../models/book.model");

class BooksRouter {
    constructor(data) {
        this.data = data;
        this.typeData = this.data.getModelData(Book);
        this.router = new express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/", (req, res) => {
                if (req.query.pattern) {
                    return this.typeData.find(req.query.pattern)
                        .then(books => res.send(books));
                }

                return this.typeData.getAll()
                    .then(books => res.send(books));
            })
            .get("/:id", (req, res) => {
                const id = req.params.id;
                this.typeData.getById(id)
                    .then(book => res.send(book));
            })
            .post("/", (req, res) => {
                const book = req.body;
                this.typeData.add(book)
                    .then(dbBook => res.status(201).send(dbBook));
            });
    }

    attachToMaster(masterRouter) {
        masterRouter.use("/books", this.router);
    }
}

module.exports = BooksRouter;