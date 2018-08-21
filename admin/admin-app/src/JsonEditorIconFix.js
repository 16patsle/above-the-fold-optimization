import React, { Component } from 'react';

const iconsUrl = window.homeUrl.value + '/wp-content/plugins/above-the-fold-optimization/admin/js/jsoneditor/img/jsoneditor-icons.svg'

class JsonEditorIconFix extends Component {
    render() {
        return (
            <style>
                {`
                div.jsoneditor-tree button {
                    background: transparent url("${iconsUrl}");
                }

                div.jsoneditor-tree button.jsoneditor-dragarea {
                    background: url("${iconsUrl}") -72px -72px;
                }

                div.jsoneditor-tree .jsoneditor-schema-error {
                    background: url("${iconsUrl}")  -168px -48px;
                }

                .jsoneditor-text-errors .jsoneditor-schema-error {
                    background: url("${iconsUrl}")  -168px -48px;
                }

                div.jsoneditor-contextmenu div.jsoneditor-icon {
                    background-image: url("${iconsUrl}");
                }

                div.jsoneditor-contextmenu ul li button div.jsoneditor-expand {
                    background: url("${iconsUrl}") 0 -72px;
                }

                div.jsoneditor-menu > button {
                  background: transparent url("${iconsUrl}");
                }

                table.jsoneditor-search button {
                    background: url("${iconsUrl}");
                }

                div.jsoneditor-statusbar > .jsoneditor-validation-error-icon {
                    background: url("${iconsUrl}") -168px -48px;
                }'
`}
            </style>
        );
    }
}

export default JsonEditorIconFix;

/*
'div.jsoneditor-tree button {
background: transparent url("img/jsoneditor-icons.svg");
}

div.jsoneditor - tree button.jsoneditor - dragarea {
    background: url("img/jsoneditor-icons.svg") - 72px - 72px;
}

div.jsoneditor - tree.jsoneditor - schema - error {
    background: url("img/jsoneditor-icons.svg") - 168px - 48px;
}

.jsoneditor - text - errors.jsoneditor - schema - error {
    background: url("img/jsoneditor-icons.svg") - 168px - 48px;
}

div.jsoneditor - contextmenu div.jsoneditor - icon {
    background - image: url("img/jsoneditor-icons.svg");
}

div.jsoneditor - contextmenu ul li button div.jsoneditor - expand {
    background: url("img/jsoneditor-icons.svg") 0 - 72px;
}

div.jsoneditor - menu > button,
    div.jsoneditor - menu > div.jsoneditor - modes > button {
    background: transparent url("img/jsoneditor-icons.svg");
}

table.jsoneditor - search button {
    background: url("img/jsoneditor-icons.svg");
}

div.jsoneditor - statusbar > .jsoneditor - validation - error - icon {
    background: url("img/jsoneditor-icons.svg") - 168px - 48px;
} '*/