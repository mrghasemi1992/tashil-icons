require("dotenv").config();
const svgo = require("@figma-export/transform-svg-with-svgo");

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const fileId = process.env.FILE_ID;

const outputters = [
  require("@figma-export/output-components-as-svg")({ output: "./" }),
  require("@figma-export/output-components-as-svgr")({
    getFileExtension: () => ".tsx",
    getComponentName: ({ componentName, pageName }) =>
      componentName + capitalize(pageName),
    getSvgrConfig: () => ({ typescript: true }),
    output: "./src",
  }),
];

/** @type {import('svgo').PluginConfig[]} */
const outlineSVGOConfig = [
  { name: "sortAttrs", sortAttrs: true },
  {
    name: "removeAttrs",
    params: {
      attrs: "stroke",
    },
  },
  {
    name: "addAttributesToSVGElement",
    params: { attributes: [{ stroke: "currentColor" }] },
  },
];

/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
  commands: [
    [
      "components",
      {
        fileId,
        onlyFromPages: ["outline"],
        transformers: [svgo({ multipass: true, plugins: outlineSVGOConfig })],
        outputters,
      },
    ],
  ],
};
