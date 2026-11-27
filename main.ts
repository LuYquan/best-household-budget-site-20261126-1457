// Willow House entrypoint: copy app/ and screenshots/ into the
// output directory and write dossier.json with buildDossier.
import { buildDossier } from './vendor/makefun-frontend.ts';
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(out, { recursive: true });
for (const entry of readdirSync(out)) rmSync(join(out, entry), { recursive: true, force: true });
mkdirSync(join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
cpSync(join(root, 'app'), join(out, 'app'), { recursive: true });
cpSync(join(root, 'screenshots'), join(out, 'screenshots'), { recursive: true });
writeFileSync(join(out, 'dossier.json'), buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
}));
