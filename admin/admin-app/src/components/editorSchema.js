export const htmlSchema = {
  title: 'HTML search and replace',
  type: 'array',
  items: {
    oneOf: [
      {
        title: 'String Match',
        type: 'object',
        properties: {
          search: {
            type: 'string'
          },
          replace: {
            type: 'string'
          }
        },
        required: ['search', 'replace'],
        additionalProperties: false
      },
      {
        title: 'Regular Expression Match',
        type: 'object',
        properties: {
          search: {
            type: 'string'
          },
          replace: {
            type: 'string'
          },
          regex: {
            title: 'Regular expression',
            type: 'boolean',
            enum: [true]
          }
        },
        required: ['search', 'replace', 'regex'],
        additionalProperties: false
      }
    ]
  },
  uniqueItems: true
};

export const http2Schema = {
  title: 'HTTP/2 Push',
  type: 'array',
  items: {
    oneOf: [
      {
        title: 'WordPress enqueued stylesheets or scripts.',
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['style', 'script', 'image']
          },
          match: {
            oneOf: [
              {
                type: 'string',
                enum: ['all']
              },
              {
                title: 'Match the URL of a stylesheet of script.',
                type: 'object',
                properties: {
                  pattern: {
                    type: 'string',
                    minLength: 1
                  },
                  regex: {
                    type: 'boolean'
                  },
                  exclude: {
                    type: 'boolean'
                  }
                },
                required: ['pattern'],
                additionalProperties: false
              }
            ]
          },
          meta: {
            title: 'Add meta rel=preload to header.',
            type: 'boolean'
          }
        },
        additionalProperties: false,
        required: ['type', 'match']
      },
      {
        title: 'Custom resources.',
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['custom']
          },
          resources: {
            title: 'Resources to push.',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                file: {
                  type: 'string'
                },
                type: {
                  type: 'string',
                  enum: [
                    'audio',
                    'video',
                    'track',
                    'script',
                    'style',
                    'image',
                    'font',
                    'fetch',
                    'worker',
                    'embed',
                    'object',
                    'document'
                  ]
                },
                mime: {
                  type: 'string'
                }
              },
              additionalProperties: false,
              required: ['file', 'type']
            },
            uniqueItems: true
          },
          meta: {
            title: 'Add meta rel=preload to header.',
            type: 'boolean'
          }
        },
        additionalProperties: false,
        required: ['type', 'resources']
      }
    ]
  },
  uniqueItems: true
};

export const pwaAssetCacheSchema = {
  title: 'PWA Cache Policy',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      match: {
        type: 'array',
        items: {
          oneOf: [
            {
              title: 'Match the URL of an asset.',
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['url']
                },
                pattern: {
                  type: 'string',
                  minLength: 1
                },
                regex: {
                  type: 'boolean'
                },
                not: {
                  type: 'boolean'
                }
              },
              required: ['type', 'pattern'],
              additionalProperties: false
            },
            {
              title: 'Match the URL of an asset in a list of URLs.',
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['url']
                },
                pattern: {
                  type: 'array',
                  items: {
                    type: 'string',
                    minLength: 1
                  },
                  uniqueItems: true
                },
                not: {
                  type: 'boolean'
                }
              },
              required: ['type', 'pattern'],
              additionalProperties: false
            },
            {
              title: 'Match a request header.',
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['header']
                },
                name: {
                  type: 'string',
                  minLength: 1
                },
                pattern: {
                  type: 'string',
                  minLength: 1
                },
                regex: {
                  type: 'boolean'
                },
                not: {
                  type: 'boolean'
                }
              },
              required: ['type', 'name', 'pattern'],
              additionalProperties: false
            }
          ]
        },
        uniqueItems: true
      },
      strategy: {
        title: 'Enter the cache strategy for the matched resources.',
        type: 'string',
        default: 'network',
        enum: ['never', 'cache', 'network', 'event']
      },
      offline: {
        title:
          'Enter a path to an alternative resource to precache and serve when the network fails and no cache is available.',
        type: 'string'
      },
      cache: {
        title: 'Cache configuration',
        type: 'object',
        properties: {
          update_interval: {
            title: 'Enter a time in seconds to update the cache.',
            type: 'number',
            min: 0
          },
          head_update: {
            title:
              'Update cache ased on HTTP HEAD request with etag/last-modified header validation.',
            type: 'boolean'
          },
          max_age: {
            title: 'Enter an expire time in seconds.',
            type: 'number',
            min: 0
          },
          conditions: {
            type: 'array',
            items: {
              oneOf: [
                {
                  title: 'Match the URL of an asset.',
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['url']
                    },
                    pattern: {
                      type: 'string',
                      minLength: 1
                    },
                    regex: {
                      type: 'boolean'
                    },
                    not: {
                      type: 'boolean'
                    }
                  },
                  required: ['type', 'pattern'],
                  additionalProperties: false
                },
                {
                  title: 'Match a response header.',
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['header']
                    },
                    name: {
                      type: 'string',
                      minLength: 1
                    },
                    pattern: {
                      type: 'string',
                      minLength: 1
                    },
                    regex: {
                      type: 'boolean'
                    },
                    not: {
                      type: 'boolean'
                    }
                  },
                  required: ['type', 'name', 'pattern'],
                  additionalProperties: false
                },
                {
                  title: 'Match a response header by comparison.',
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['header']
                    },
                    name: {
                      type: 'string',
                      minLength: 1
                    },
                    pattern: {
                      oneOf: [
                        {
                          title: 'Compare a numeric header value.',
                          type: 'object',
                          properties: {
                            operator: {
                              type: 'string',
                              enum: ['<', '=', '>']
                            },
                            value: {
                              type: 'number'
                            }
                          },
                          additionalProperties: false
                        }
                      ]
                    },
                    not: {
                      type: 'boolean'
                    }
                  },
                  required: ['type', 'name', 'pattern'],
                  additionalProperties: false
                }
              ]
            },
            uniqueItems: true
          }
        },
        required: [],
        additionalProperties: false
      }
    },
    additionalProperties: false,
    required: ['match', 'strategy']
  },
  uniqueItems: true
};

export const pwaManifestSchema = {
  title: 'Web App Manifest',
  type: 'object',
  properties: {
    short_name: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    theme_color: {
      type: 'string'
    },
    background_color: {
      type: 'string'
    },
    display: {
      type: 'string',
      enum: ['fullscreen', 'standalone', 'minimal-ui', 'browser']
    },
    orientation: {
      type: 'string',
      enum: [
        'any',
        'natural',
        'landscape',
        'landscape-primary',
        'landscape-secondary',
        'portrait',
        'portrait-primary',
        'portrait-secondary'
      ]
    },
    start_url: {
      type: 'string'
    },
    lang: {
      type: 'string'
    },
    dir: {
      type: 'string'
    },
    scope: {
      type: 'string'
    },
    serviceworker: {
      type: 'object',
      properties: {
        src: {
          type: 'string'
        },
        scope: {
          type: 'string'
        },
        use_cache: {
          type: 'boolean'
        }
      },
      additionalProperties: true
    },
    related_applications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          platform: {
            type: 'string'
          },
          url: {
            type: 'string'
          },
          id: {
            type: 'string'
          }
        },
        additionalProperties: true
      },
      uniqueItems: true
    },
    icons: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          src: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          sizes: {
            type: 'string'
          },
          density: {
            type: 'string'
          }
        },
        additionalProperties: true
      },
      uniqueItems: true
    },
    screenshots: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          src: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          sizes: {
            type: 'string'
          }
        },
        additionalProperties: true
      },
      uniqueItems: true
    }
  },
  required: [
    'name',
    'short_name',
    'icons',
    'theme_color',
    'background_color',
    'display',
    'orientation',
    'start_url'
  ],
  additionalProperties: true
};
