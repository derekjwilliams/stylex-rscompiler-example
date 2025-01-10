/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
const path = require('path');
module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-transform-private-methods'],
    [
      '@stylexjs/babel-plugin',
      // See all options in the babel plugin configuration docs:
      // https://stylexjs.com/docs/api/configuration/babel-plugin/
      {
        debug: false,
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        aliases: {
          '@/*': [path.join(__dirname, '*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
        },
      },
    ],
  ],
};

// const path = require('path')
// module.exports = {
//   presets: ['next/babel'],
//   plugins: [
//     ['@babel/plugin-transform-private-methods'],
//     [
//       '@stylexjs/babel-plugin',
//       {
//         dev: process.env.NODE_ENV === 'development',
//         runtimeInjection: false,
//         genConditionalClasses: true,
//         treeshakeCompensation: true,
//         unstable_moduleResolution: {
//           type: 'commonJS',
//           rootDir: __dirname,
//         },
//       },
//     ],
//   ],
//   env: {
//     development: {
//       compact: false,
//     },
//   },
// }

