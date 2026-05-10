import type { SkuConfig } from 'sku';

const config: SkuConfig = {
  // Vite is required for dev-mode base-path support. sku's webpack flow
  // hardcodes publicPath="/" for `sku start` (see sku's
  // services/webpack/config/webpack.config.mjs:60) and does NOT apply
  // dangerouslySetWebpackConfig either, so the prototype can't be served
  // behind Portal's /p/<id>/preview/ prefix on webpack.
  bundler: 'vite',
  clientEntry: 'src/client.tsx',
  renderEntry: 'src/render.tsx',
  port: 3000,
  hosts: ['localhost', '127.0.0.1'],
  // When the prototype is opened through the Portal proxy, start-dev.sh
  // exports BASE_PATH=/p/<id>/preview. Tell Vite to emit asset URLs prefixed
  // with that path so they route back through the proxy.
  dangerouslySetViteConfig: () => ({
    base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : '/',
    server: {
      // HMR WebSocket client must reconnect through the proxied origin.
      // Without an explicit path, Vite uses "/" which won't match Portal's
      // /p/<id>/preview/* upgrade route.
      hmr: process.env.BASE_PATH
        ? { path: `${process.env.BASE_PATH}/` }
        : undefined,
    },
  }),
};

export default config;
