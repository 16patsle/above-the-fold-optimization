/**
 * Helper to link component state with input values. Value of this must be bound to React component.
 * https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112
 * @param {String} attr - State property to link to input
 * @returns {Object} Object with a value property for reading value, and a set method to set state.
 */
export function linkState(attr) {
    const component = this;
    return {
        value: component.state[attr],
        set(x) {
            component.setState({ [attr]: x });
        }
    }
}

/**
 * Helper to link component state with input values. Variant of linkState that binds to a property of state.options. Value of this must be bound to React component.
 * https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112
 * @param {String} attr - State property to link to input
 * @returns {Object} Object with a value property for reading value, and a set method to set state.
 */
export function linkOptionState(attr) {
    const component = this;
    return {
        value: component.state.options[attr],
        set(x) {
            const options = { ...component.state.options };
            options[attr] = x
            component.setState({ options })
        }
    }
}