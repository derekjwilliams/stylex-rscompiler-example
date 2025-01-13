const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

function getPackageIncludePaths(packageName, nodeModulePaths) {
  let packagePath = null;

  for (const nodeModulePath of nodeModulePaths) {
    const packageJsonPath = path.resolve(
      nodeModulePath,
      packageName,
      'package.json',
    );
    if (fs.existsSync(packageJsonPath)) {
      packagePath = path.dirname(packageJsonPath);
      break;
    }
  }
  if (!packagePath) {
    throw new Error(`Could not find package ${packageName}`);
  }

  return [
    path.join(packagePath, '**/*.{js,mjs}'),
    '!' + path.join(packagePath, 'node_modules/**/*.{js,mjs}'),
  ];
}

const openPropsIncludePaths = getPackageIncludePaths('@stylexjs/open-props', [
  path.join(projectRoot, 'node_modules'),
]);

module.exports = {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'src/app/**/*.{js,jsx,ts,tsx}',
        'src/components/**/*.{js,jsx,ts,tsx}',
        ...openPropsIncludePaths,
      ],
      useCSSLayers: false, // required for tailwind to play nicely, if it is required to be true, then update next.config.js to set extractCSS to true, which increases payload a little
      rsOptions: {
        aliases: {
          '@/*': [
            path.join(projectRoot, './src/*'),
          ],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: projectRoot,
        },
        isDev: process.env.NODE_ENV === 'development',
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    },
     tailwindcss: {},
    autoprefixer: {},
  },
};