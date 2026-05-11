import { hydrateRoot } from 'react-dom/client';
import { App } from './App';

// -----------------------------------------------------------------------------
// PATCHED FILE — see protoproto/docs/superpowers/specs/2026-05-11-template-client-entry-fix-design.md
//
// Why this file is unusual:
//   sku start (dev) and sku build (static render) call the client entry
//   differently, and the portal proxy at /p/<id>/preview/* forces us to
//   support both shapes from one file:
//     - dev:   project's index.html loads /src/client.tsx via a plain
//              <script type="module">. sku's vite-client wrapper would
//              normally call our default export, but sku's middleware
//              only fires on req.url === "/index.html", which never
//              matches when Vite base != "/". So nothing calls anything
//              unless we run something at the top level.
//     - build: sku generates its own HTML, imports this module via its
//              vite-client wrapper, and calls `client(clientContext)`.
//              That requires a default export function.
//   The hybrid below satisfies both. `import.meta.env.DEV` is tree-shaken
//   in production builds, so the built bundle exposes only the default.
//
// DO NOT "simplify" by removing either half. The agent that added React
// Router on 2026-05-11 removed the dev side-effect to make `sku build`
// pass; that broke the portal preview with a blank page.
//
// Remove this patch when ANY of these hold:
//   - sku's vite middleware grows base-aware route matching (fires on
//     `/p/<id>/preview/` etc.)
//   - the portal proxy is reworked to strip the prefix before forwarding
//     to Vite (would let Vite use base: "/" again)
//   - sku stops requiring a default export for static-render builds
// -----------------------------------------------------------------------------

const main = () => {
  const root = document.getElementById('app');
  if (!root) return;
  hydrateRoot(root, <App />);
};

// Used by `sku build` — sku's vite-client wrapper calls this against the
// statically pre-rendered HTML in dist/.
export default main;

// Used by `sku start` — the project's index.html loads this module
// directly with a plain <script type="module">, so a top-level call is
// the only thing that triggers a render. Vite tree-shakes this branch
// when building for production.
if (import.meta.env.DEV) main();
