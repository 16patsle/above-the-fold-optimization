import htmlEntities from './htmlEntities';

/**
 * Return string with array values separated with newline
 * @param {Array} - The array of strings
 * */
function newlineArrayString(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return '';
    }

    return htmlEntities(array.join("\n"));
}

export default newlineArrayString;