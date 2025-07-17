import { loadEnv as rsbuildLoadEnv } from '@rsbuild/core';
import { type } from 'arktype';

const Env = type({
  PUBLIC_PORT: type('string.integer.parse').to('number > 0'),
});

const { rawPublicVars } = await rsbuildLoadEnv({
  cwd: import.meta.dirname,
  mode: process.env.NODE_ENV ?? 'development',
});

const env = Env.assert(rawPublicVars);

const define = /** @type {(keyof typeof env)[]} */ (Object.keys(env)).reduce(
  (define, key) => {
    const stringified = JSON.stringify(env[key]);
    return Object.assign(define, {
      [`import.meta.env.${key}`]: stringified,
      [`process.env.${key}`]: stringified,
    });
  },
  /** @type {Record<string, string>} */ ({}),
);

export { env, define };
