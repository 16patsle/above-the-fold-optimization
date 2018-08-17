export default {
    "title": "HTML search and replace",
    "type": "array",
    "items": {
        "oneOf": [{
            "title": "String Match",
            "type": "object",
            "properties": {
                "search": {
                    "type": "string"
                },
                "replace": {
                    "type": "string"
                }
            },
            "required": [
                "search",
                "replace"
            ],
            "additionalProperties": false
        }, {
            "title": "Regular Expression Match",
            "type": "object",
            "properties": {
                "search": {
                    "type": "string"
                },
                "replace": {
                    "type": "string"
                },
                "regex": {
                    "title": "Regular expression",
                    "type": "boolean",
                    "enum": [
                        true
                    ]
                }
            },
            "required": [
                "search",
                "replace",
                "regex"
            ],
            "additionalProperties": false
        }]
    },
    "uniqueItems": true
}