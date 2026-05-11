# Prototype workspace — agent instructions

## Designer brief

Before starting any new screen or feature, read everything in `brief/`. Treat
the contents as the source of truth for product intent. If `brief/` is empty,
ask the designer what they want to build before generating UI.

## Commits

Do not run `git commit` or `git push` unless the user explicitly asks for a
checkpoint. The autosave loop is a separate system process (a systemd timer);
it is not your responsibility and you must not invoke it manually.

## Patched files — do not regress without checking the spec

These files contain workarounds for upstream framework quirks. They look like
ordinary code but are load-bearing. If you change them, read the linked spec
first and keep the patch invariants intact.

| File | What it patches | Spec |
|------|-----------------|------|
| `src/client.tsx` | Hybrid entry: default export for `sku build` (called by sku's `vite-client` wrapper) plus a `import.meta.env.DEV`-gated top-level side-effect for `sku start` (because the project's `index.html` bypasses sku's wrapper when Vite `base != "/"`). Removing either half breaks one mode. | `protoproto/docs/superpowers/specs/2026-05-11-template-client-entry-fix-design.md` |

When adding routing, state, or refactoring `src/client.tsx`, keep both the
default export and the `import.meta.env.DEV` side-effect call. Wrap your
additions inside `main()` rather than replacing it.
