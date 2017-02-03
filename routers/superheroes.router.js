/* globals require module */

const express = require("express");

const Superhero = require("../models/superhero.model");

class SuperheroesRouter {
    constructor(data) {
        this.data = data;
        this.superheroesData = this.data.getModelData(Superhero);
        this.router = new express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .get("/", (req, res) => {
                if (req.query.pattern) {
                    return this.superheroesData.find(req.query.pattern)
                        .then(superheroes => res.send(superheroes));
                }

                return this.superheroesData.getAll()
                    .then(superheroes => res.send(superheroes));
            })
            .get("/:id", (req, res) => {
                const id = req.params.id;
                this.superheroesData.getById(id)
                    .then(superheroes => res.send(superheroes));
            })
            .post("/", (req, res) => {
                const sh = req.body;
                this.superheroesData.add(sh)
                    .then(superhero => res.status(201).send(superhero));
            });
    }

    attachToMaster(masterRouter) {
        masterRouter.use("/superheroes", this.router);
    }
}

module.exports = SuperheroesRouter;