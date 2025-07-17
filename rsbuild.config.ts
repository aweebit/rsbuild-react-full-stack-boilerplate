import { client } from './rsbuild/client.config';
import { common } from './rsbuild/common';
import { server } from './rsbuild/server.config';
import { mergeRsbuildConfig } from '@rsbuild/core';
import { type RsbuildConfig } from '@rsbuild/core';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default mergeRsbuildConfig<RsbuildConfig>(common, {
  plugins: [
    pluginTypeCheck({
      tsCheckerOptions: {
        typescript: { build: true, mode: 'write-references' },
      },
    }),
  ],
  server: { port: 5555 },
  environments: {
    client,
    server,
  },
});
