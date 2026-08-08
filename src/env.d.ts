/// <reference path="../.astro/types.d.ts" />

import type { Runtime } from '@astrojs/cloudflare';

type CloudflareEnv = {
  META_ACCESS_TOKEN?: string;
};

declare global {
  namespace App {
    interface Locals extends Runtime<CloudflareEnv> {}
  }
}
