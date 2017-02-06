/* globals module Promise require */
const ObjectId = require("mongodb").ObjectID;

class ModelData {
    constructor(Klass, db) {
        this.Klass = Klass;
        this.KlassName = this.Klass.name;
        this.collectionName = (this.KlassName + "s").toLowerCase();
        this.db = db;
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.find("");
    }

    find(pattern) {
        let properties = this.Klass.getSearchProperties();

        if (!properties || properties.length === 0) {
            return Promise.reject("These models cannot be searched");
        }

        const query = { $or: [] };

        properties.forEach(prop => {
            query.$or.push({
                [prop]: {
                    $regex: pattern,
                    $options: "-i"
                }
            });
        });

        return this.collection.find(query)
            .toArray()
            .then(items => {
                if (!this.Klass.fromModel) {
                    return items;
                }

                return items.map(item => this.Klass.fromModel(item));
            });
    }

    getById(id) {
        return this.collection.findOne({ _id: new ObjectId(id) })
            .then(model => {
                if (!this.Klass.fromModel) {
                    return model;
                }

                return this.Klass.fromModel(model);
            });
    }

    add(obj) {
        let model = obj;
        if (this.Klass.fromModel) {
            model = this.Klass.fromModel(model);
        }

        return this.collection.insert(model)
            .then(result => result.ops[0])
            .then(dbModel => {
                if (this.Klass.fromModel) {
                    return this.Klass.fromModel(dbModel);
                }
                return dbModel;
            });
    }
}

class Data {
    constructor(db) {
        this.db = db;
        this.datas = {};
    }
    getModelData(Klass) {
        const klassName = Klass.name;
        if (!this.datas[klassName]) {
            this.datas[klassName] = new ModelData(Klass, this.db);
        }
        return this.datas[klassName];
    }
}

module.exports = Data;