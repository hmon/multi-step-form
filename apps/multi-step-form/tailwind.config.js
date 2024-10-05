const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const preset = require("../../libs/design-system/src");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [preset],
  theme: {
    extend: {},
  },
  plugins: [],
};
