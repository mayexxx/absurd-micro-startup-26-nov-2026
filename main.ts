import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR || '/output');
const sentence = "We sell AI agents a subscription to do nothing: $9 a month for a dashboard that says 'delegated' while the agent naps.";

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'entry.txt'), sentence, 'utf8');

const content = await readFile(resolve(outputDir, 'entry.txt'), 'utf8');
if (content !== sentence || content.length !== 118 || /[\r\n]/.test(content)) {
  throw new Error(`Invalid entry content: ${JSON.stringify(content)}`);
}
