/* globals module */

class Mapper {
    static map(obj, ...props) {
        props =
            (Array.isArray(props[0])) ?
            props[0] :
            props;

        return props.reduce((m, key) => {
            m[key] = obj[key];
            return m;
        }, {});
    }
}

module.exports = Mapper;