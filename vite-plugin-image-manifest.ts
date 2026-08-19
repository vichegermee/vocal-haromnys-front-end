import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

/**
 * Scans public/images/<folderName>/ and writes manifest.json listing every
 * image file currently in it. The frontend fetches that manifest instead of
 * hardcoding filenames, so dropping a new file into the folder and
 * rebuilding is enough to make it show up — no code change needed.
 *
 * Runs on every dev-server start/file-change and on every production build,
 * so the manifest is always regenerated from whatever is actually in the
 * folder at that moment.
 */
export function imageManifestPlugin(folderName: string): Plugin {
  const dir = path.resolve(process.cwd(), 'public/images', folderName);
  const manifestPath = path.join(dir, 'manifest.json');

  function writeManifest() {
    const files = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      : [];
    fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + '\n');
  }

  return {
    name: `${folderName}-manifest`,
    buildStart() {
      writeManifest();
    },
    configureServer(server) {
      writeManifest();
      server.watcher.add(dir);
      server.watcher.on('all', (_event, changedPath) => {
        if (path.resolve(changedPath).startsWith(dir) && changedPath !== manifestPath) {
          writeManifest();
        }
      });
    },
  };
}
