/**
 * @typedef {import('prettier').Config} Config
 * @typedef {import(
 *  '@trivago/prettier-plugin-sort-imports'
 * ).PluginConfig} PluginConfig
 *
 * @type {Config & PluginConfig}
 */
const config = {
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['(?<!\\.module\\.css)$', '\\.module\\.css$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSideEffects: false,
};

export default config;
