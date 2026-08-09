import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

/**
 * Scans public/images/partners/ and writes manifest.json listing every image
 * file currently in it. The frontend fetches that manifest (see
 * src/api/partners.ts) instead of hardcoding filenames, so dropping a new
 * logo into the folder and rebuilding is enough to make it show up — no
 * code change needed.
 *
 * Runs on every dev-server start/file-change and on every production build,
 * so the manifest is always regenerated from whatever is actually in the
 * folder at that moment.
 */
export function partnersManifestPlugin(): Plugin {
  const partnersDir = path.resolve(process.cwd(), 'public/images/partners');
  const manifestPath = path.join(partnersDir, 'manifest.json');

  function writeManifest() {
    const files = fs.existsSync(partnersDir)
      ? fs
          .readdirSync(partnersDir)
          .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      : [];
    fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + '\n');
  }

  return {
    name: 'partners-manifest',
    buildStart() {
      writeManifest();
    },
    configureServer(server) {
      writeManifest();
      server.watcher.add(partnersDir);
      server.watcher.on('all', (_event, changedPath) => {
        if (path.resolve(changedPath).startsWith(partnersDir) && changedPath !== manifestPath) {
          writeManifest();
        }
      });
    },
  };
}
