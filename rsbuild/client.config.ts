import { common } from './common';
import {
  type EnvironmentConfig,
  type RsbuildConfig,
  mergeRsbuildConfig,
} from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { resolve } from 'node:path';

const resolveFromRoot = (...paths: string[]) =>
  resolve(import.meta.dirname, '..', ...paths);

export const client: EnvironmentConfig = mergeRsbuildConfig(common, {
  source: {
    entry: {
      index: resolveFromRoot('client/src/main.tsx'),
    },
  },
  output: {
    distPath: {
      root: resolveFromRoot('client/dist'),
    },
  },
  plugins: [pluginReact()],
});

export default mergeRsbuildConfig<RsbuildConfig>(client, {
  server: { port: 5555 },
  plugins: [
    pluginTypeCheck({
      tsCheckerOptions: {
        typescript: {
          configFile: resolveFromRoot('tsconfig/tsconfig.client.json'),
          build: true,
          mode: 'write-references',
        },
      },
    }),
  ],
});
