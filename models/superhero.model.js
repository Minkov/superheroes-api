/* globals module */

const props = ["name", "secretIdentity", "imgUrl", "story", "factions", "powers", "_id"];

class Superhero {
    constructor(name, secretIdentity, imgUrl, story, factions, powers, id = null) {
        this.name = name;
        this.secretIdentity = secretIdentity;
        this.story = story;
        this.factions = factions;
        this.imgUrl = imgUrl;
        this.powers = powers;
        this.id = id;
    }

    static fromModel(model) {
        const values =
            props.reduce((a, prop) => {
                a.push(model[prop]);
                return a;
            }, []);
        return new Superhero(...values);
    }

    static getSearchProperties() {
        return ["name", "secretIdentity", "story"];
    }
}

module.exports = Superhero;