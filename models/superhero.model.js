/* globals module */

class Superhero {
    constructor(name, secretIdentity, id = null) {
        this.name = name;
        this.secretIdentity = secretIdentity;
        this.id = id;
    }

    static fromModel(model) {
        return new Superhero(model.name, model.secretIdentity, model._id);
    }

    static getSearchProperties() {
        return ["name", "secretIdentity"];
    }
}

module.exports = Superhero;