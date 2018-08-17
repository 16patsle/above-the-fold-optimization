/**
 * The WordPress get_submit_button functions in Javascript
 * @see https://core.trac.wordpress.org/browser/tags/4.9/src/wp-admin/includes/template.php#L1955
 * @author WordPress contributors
 * @author Patrick Sletvold
 * @license GPLv2
 */

import escapeHtml from './escapeHtml';

/**
 * Returns a submit button, with provided text and appropriate class(es).
 *
 * @param {String} [text='Save Changes'] - The text of the button
 * @param {String} [type='primary'] - The type and CSS class(es) of the button. Core values
 *                                    include 'primary', 'small', and 'large'. Default 'primary'.
 * @param {String} [name='submit'] - The HTML name of the submit button. If no id attribute is given in
 *                                   otherAttributes below, name will be used as the button's id.
 * @param {Boolean} [wrap=true] - True if the output button should be wrapped in a paragraph tag, false otherwise.
 * @param {Array|String} [otherAttributes=null] - Other attributes that should be output with the button, mapping
 *                                                 attributes to their values, such as setting tabindex to 1, etc.
 *                                                 These key/value attribute pairs will be output as attribute="value",
 *                                                 where attribute is the key. Other attributes can also be provided
 *                                                 as a string such as 'tabindex="1"', though the array format is
 *                                                 preferred.
 * @returns {String} - Submit button HTML
 */
function getSubmitButton(text = '', type = 'primary large', name = 'submit', wrap = true, otherAttributes = '') {
    if (!Array.isArray(type)) {
        type = type.split(' ');
    }

    const buttonShorthand = ['primary', 'small', 'large'];
    const classes = ['button'];
    for (const t of type) {
        if ('secondary' === t || 'button-secondary' === t) {
            continue;
        }

        if (buttonShorthand.includes(t)) {
            classes.push('button-' + t)
        } else {
            classes.push(t)
        }
    }
    // Remove empty items, remove duplicate items, and finally build a string.
    const className = classes.filter((value, index, self) => {
        return self.indexOf(value) === index;
    }).join(' ')

    text = text || 'Save Changes';

    // Default the id attribute to name unless an id was specifically provided in otherAttributes
    let id = name;
    if (Array.isArray(otherAttributes) && otherAttributes['id']) {
        id = otherAttributes['id'];
        delete otherAttributes['id'];
    }

    let attributes = '';
    if (Array.isArray(otherAttributes)) {
        for (const attribute in attributes) {
            attributes += `${attribute}="${escapeHtml(attributes[attribute])}" `; // Trailing space is important
        }
    } else if (otherAttributes.length > 0) { // Attributes provided as a string
        attributes = otherAttributes;
    }

    // Don't output empty name and id attributes.
    const nameAttr = ` name="${escapeHtml(name)}"` || '';
    const idAttr = ` id="${escapeHtml(id)}"` || '';

    let button = `<input type="submit"${nameAttr + idAttr} class="${escapeHtml(className)}`;
    button += `" value="${escapeHtml(text)}" ${attributes} />`;

    if (wrap) {
        button = `<p class="submit">${button}</p>`;
    }

    return button;
}

export default getSubmitButton