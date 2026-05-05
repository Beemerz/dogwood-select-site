import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const standaloneRoot = path.join(root, '.next', 'standalone');
const standaloneNextRoot = path.join(standaloneRoot, '.next');

function replaceDir(from, to) {
  if (!existsSync(from)) {
    return;
  }

  rmSync(to, { recursive: true, force: true });
  mkdirSync(path.dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

replaceDir(path.join(root, 'public'), path.join(standaloneRoot, 'public'));
replaceDir(path.join(root, '.next', 'static'), path.join(standaloneNextRoot, 'static'));

console.log('Standalone assets synced.');
