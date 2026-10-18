/* tools/validate.mjs — command-line dataset validation (OPTIONAL).
 *
 *   node tools/validate.mjs data/breast.js
 *   node tools/validate.mjs data/*.js
 *
 * The same checks run automatically in the browser on every boot and print to
 * the console, so Node is NOT required to use this project. This wrapper exists
 * for CI or for validating a dataset without opening a page.
 *
 * Exit code 0 = no errors, 1 = errors found.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

/* Load the shared validator (a plain script, not an ES module). */
const validatorSrc = fs.readFileSync(path.join(root, 'js', 'validate.js'), 'utf8');
const sandbox = { console, module: { exports: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(validatorSrc, sandbox, { filename: 'js/validate.js' });
const Validate = sandbox.Validate;

if (!Validate) {
  console.error('Could not load js/validate.js');
  process.exit(1);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node tools/validate.mjs <dataset.js> [...]');
  process.exit(1);
}

let failed = 0;

for (const file of files) {
  const abs = path.resolve(process.cwd(), file);
  if (!fs.existsSync(abs)) {
    console.error(`[validate] missing file: ${file}`);
    failed++;
    continue;
  }

  /* Datasets self-register, so stub the registry and capture what they hand us. */
  const captured = [];
  const ctx = {
    console,
    CancerExplorer: { register: (ds) => captured.push(ds) }
  };
  vm.createContext(ctx);

  try {
    vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: file });
  } catch (err) {
    console.error(`[validate] ${file} threw while loading: ${err.message}`);
    failed++;
    continue;
  }

  if (!captured.length) {
    console.error(`[validate] ${file} registered no dataset ` +
      `(did you forget CancerExplorer.register({...})?)`);
    failed++;
    continue;
  }

  for (const ds of captured) {
    const res = Validate.dataset(ds);
    const ok = Validate.report(`${file} → ${ds.id}`, res);
    if (!ok) failed++;
  }
}

if (failed) {
  console.error(`\n${failed} dataset(s) failed validation.`);
  process.exit(1);
}
console.log('\nAll datasets valid.');
