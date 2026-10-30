# Windows launcher repair

The reported `SQLITE_CANTOPEN` was reproduced when Windows workerd tried to open its local SQLite file under a long storage path. A shorter path worked. The zero-valued local database ID is expected for local preview; it does not require a remote database.

## Change

`Launch JMG Realty.cmd` still opens the local website through `scripts/open-local.mjs`. The launcher now:

- Uses a short writable `%LOCALAPPDATA%\JMGRealtyPH` base, with a separate persistent records folder for each extracted source path.
- Installs packages in a shared cache keyed by the existing package lock. Installation is marked ready only after it succeeds.
- Creates each build below that cache so package resolution works without administrator privileges, symbolic links or junctions.
- Tests folder access and rejects an excessively long custom local-data path with a readable message.
- Copies a same-folder legacy `.wrangler\state` to the new location on first migration, leaving original files untouched. A live older preview must be closed first.
- Reads actual local table structure, skips schema changes already present and resumes a partially applied update without overwriting existing rows.
- Stores launch information in the short runtime location, validates served styles/scripts/images, and prints the ready URL and records path.

The hosting manifest, package lock, table schema and migration SQL are unchanged. The launcher stays on the local database.

## Verification

The updated launcher reached **JMG PREVIEW READY** from a clean extracted source folder with spaces and a **246-character source path**, built its site, initialized the local database and served its visual assets successfully. A timed smoke test stopped its owned server cleanly with exit code zero. The complete Alegria source also launched and served the assets used in browser review.

The actual **Launch JMG Realty.cmd** then passed from a fresh archive extraction with a **216-character source path**, no source node_modules and an empty package cache. It installed the pinned packages from scratch, built the complete Alegria website, initialized its local database, served styles/scripts/images, reached **JMG PREVIEW READY**, and exited its timed smoke test with code zero.

Separate scratch-database tests passed fresh initialization, repeated setup with the migration journal missing, retention of an existing probe row, and resumption of an incomplete schema update. A legacy state copy with a **367-character original SQLite file path** migrated to a short writable destination and retained its probe row. The original file’s hash remained unchanged.

Tests used an explicit writable `JMG_LOCAL_DATA_DIR` inside the authorized workspace. The normal `%LOCALAPPDATA%` path selection is implemented; the default AppData destination itself was not used in these tests. First-time installation requires internet and the Node.js/npm version described in **START-HERE.md**. No real contact records were changed, and no database or synthetic test record is included in the delivery.

## Use

Extract the new ZIP, open its **JMG-Realty-PH** folder, and double-click **Launch JMG Realty.cmd**. Keep the window open. Use its printed address instead of an older bookmark.

A different extraction starts separate local records. Keep older folders with records you need. Launching repeatedly from the same folder retains the new short-location database. Do not delete old or new databases to address a startup failure.
