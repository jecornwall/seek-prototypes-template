# Prototype workspace — agent instructions

## Designer brief

Before starting any new screen or feature, read everything in `brief/`. Treat
the contents as the source of truth for product intent. If `brief/` is empty,
ask the designer what they want to build before generating UI.

## Commits

Do not run `git commit` or `git push` unless the user explicitly asks for a
checkpoint. The autosave loop is a separate system process (a systemd timer);
it is not your responsibility and you must not invoke it manually.
