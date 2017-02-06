/* globals require module */

const express = require("express");

const Superhero = require("../models/superhero.model");
const Mapper = require("../utils/mapper");

const superheroProps = [
    "id", "name", "secretIdentity", "imgUrl"
];

const superheroDetailsProps = [
    "id", "name", "secretIdentity", "factions", "story", "imgUrl", "powers"
];

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
                let promise;
                if (req.query.pattern) {
                    promise = this.superheroesData.find(req.query.pattern);
                } else {

                    promise = this.superheroesData.getAll();
                }
                return promise
                    .then(
                        superheroes => superheroes.map(
                            superhero => Mapper.map(superhero, superheroProps)))
                    .then(superheroes => res.send(superheroes));
            })
            .get("/:id", (req, res) => {
                const id = req.params.id;
                this.superheroesData.getById(id)
                    .then(superhero => Mapper.map(superhero, ...superheroDetailsProps))
                    .then(superhero => res.send(superhero));
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