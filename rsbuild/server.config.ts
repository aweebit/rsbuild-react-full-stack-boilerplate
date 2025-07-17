import { common } from './common';
import {
  type EnvironmentConfig,
  type RsbuildConfig,
  mergeRsbuildConfig,
} from '@rsbuild/core';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { resolve } from 'node:path';

const resolveFromRoot = (...paths: string[]) =>
  resolve(import.meta.dirname, '..', ...paths);

export const server: EnvironmentConfig = mergeRsbuildConfig(common, {
  source: {
    entry: {
      main: resolveFromRoot('server/src/main.ts'),
    },
  },
  output: {
    target: 'node',
    distPath: {
      root: resolveFromRoot('./server/dist'),
    },
  },
  dev: {
    writeToDisk: true,
  },
  tools: {
    rspack: {
      target: 'node',
      output: {
        filename: '[name].cjs',
      },
    },
  },
});

export default mergeRsbuildConfig<RsbuildConfig>(server, {
  server: { port: 5554 },
  plugins: [
    pluginTypeCheck({
      tsCheckerOptions: {
        typescript: {
          configFile: resolveFromRoot('tsconfig/tsconfig.server.json'),
          build: true,
          mode: 'write-references',
        },
      },
    }),
  ],
});
