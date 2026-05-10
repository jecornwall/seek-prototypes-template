import type { SkuConfig } from 'sku';

const config: SkuConfig = {
  clientEntry: 'src/client.tsx',
  renderEntry: 'src/render.tsx',
  publicPath: process.env.BASE_PATH ?? '/',
  port: 3000,
  // `hosts` controls which Host-header values webpack-dev-server accepts —
  // it is NOT the interface-bind address. The Lima 3000->3000 forward
  // tunnels to 127.0.0.1 inside the VM, which is webpack-dev-server's
  // default bind, so this should "just work". If Task 6's
  // `curl http://localhost:3000` from the Mac fails, the fix is to
  // force the bind via `dangerouslySetWebpackConfig`:
  //
  //   dangerouslySetWebpackConfig: (config) => {
  //     if (config.devServer) config.devServer.host = '0.0.0.0';
  //     return config;
  //   },
  hosts: ['localhost', '127.0.0.1'],
};

export default config;
