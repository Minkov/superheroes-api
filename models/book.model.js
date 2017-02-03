/* globals module */

class Book {
    constructor(title, description, id = null) {
        this.title = title;
        this.description = description;
        this.id = id;
    }

    static fromModel(model) {
        return new Book(model.title, model.description, model._id);
    }

    static getSearchProperties() {
        return ["title", "description"];
    }
}

module.exports = Book;