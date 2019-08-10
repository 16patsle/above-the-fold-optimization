export const htmlSchema = {
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

export const http2Schema = {
    "title": "HTTP/2 Push",
    "type": "array",
    "items": {
        "oneOf": [{
            "title": "WordPress enqueued stylesheets or scripts.",
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["style", "script", "image"]
                },
                "match": {
                    "oneOf": [{
                        "type": "string",
                        "enum": ["all"]
                    }, {
                        "title": "Match the URL of a stylesheet of script.",
                        "type": "object",
                        "properties": {
                            "pattern": {
                                "type": "string",
                                "minLength": 1
                            },
                            "regex": {
                                "type": "boolean"
                            },
                            "exclude": {
                                "type": "boolean"
                            }
                        },
                        "required": ["pattern"],
                        "additionalProperties": false
                    }]
                },
                "meta": {
                    "title": "Add meta rel=preload to header.",
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "required": ["type", "match"]
        }, {
            "title": "Custom resources.",
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["custom"]
                },
                "resources": {
                    "title": "Resources to push.",
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "file": {
                                "type": "string"
                            },
                            "type": {
                                "type": "string",
                                "enum": ["audio", "video", "track", "script", "style", "image", "font", "fetch", "worker", "embed", "object", "document"]
                            },
                            "mime": {
                                "type": "string"
                            }
                        },
                        "additionalProperties": false,
                        "required": ["file", "type"]
                    },
                    "uniqueItems": true
                },
                "meta": {
                    "title": "Add meta rel=preload to header.",
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "required": ["type", "resources"]
        }]
    },
    "uniqueItems": true
}