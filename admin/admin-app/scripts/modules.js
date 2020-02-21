'use strict';

const path = require('path');

const nodePath = process.env.NODE_PATH || '';
const additionalModulePaths = nodePath.split(path.delimiter).filter(Boolean);

module.exports = {
  additionalModulePaths,
  webpackAliases: {}
};
