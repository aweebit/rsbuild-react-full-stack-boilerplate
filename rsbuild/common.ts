import { define } from '../loadEnv';
import { type EnvironmentConfig } from '@rsbuild/core';
import { resolve } from 'path';

const resolveFromRoot = (...paths: string[]) =>
  resolve(import.meta.dirname, '..', ...paths);

export const common: EnvironmentConfig = {
  resolve: {
    alias: {
      $shared: resolveFromRoot('shared'),
    },
  },
  source: { define },
};
