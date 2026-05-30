import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('public/data/apps.json');

const VALID_CATEGORIES = new Set(['clinical', 'education', 'data']);
const VALID_ACCESS = new Set(['open', 'credentialed', 'restricted']);
const ALLOWED_KEYS = new Set([
  'name', 'url', 'tags', 'category', 'languages',
  'github', 'description', 'dateAdded', 'access', 'dataType',
]);

try {
  const content = fs.readFileSync(dataPath, 'utf8');
  const apps = JSON.parse(content);

  if (!Array.isArray(apps)) {
    throw new Error('apps.json must be a JSON array at the top level.');
  }

  apps.forEach((app, idx) => {
    const p = `App at index ${idx} (${app.name || 'unnamed'}):`;

    if (!app.name || typeof app.name !== 'string')
      throw new Error(`${p} "name" is required and must be a string.`);

    if (!app.url || typeof app.url !== 'string')
      throw new Error(`${p} "url" is required and must be a string.`);
    try { new URL(app.url); } catch {
      throw new Error(`${p} "url" (${app.url}) is not a valid absolute URL.`);
    }

    if (!Array.isArray(app.tags) || !app.tags.every(t => typeof t === 'string'))
      throw new Error(`${p} "tags" must be an array of strings.`);

    if (!app.category || !VALID_CATEGORIES.has(app.category))
      throw new Error(`${p} "category" is required and must be one of: ${[...VALID_CATEGORIES].join(', ')}.`);

    if (!Array.isArray(app.languages) || app.languages.length === 0)
      throw new Error(`${p} "languages" is required and must be a non-empty array.`);
    if (!app.languages.every(l => typeof l === 'string' && /^[a-z]{2,3}$/.test(l)))
      throw new Error(`${p} "languages" must contain valid ISO 639-1 codes (2–3 lowercase letters).`);

    if (app.github && typeof app.github !== 'string')
      throw new Error(`${p} "github" must be a string if provided.`);
    if (app.github && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(app.github))
      throw new Error(`${p} "github" must be in "owner/repo" format. Got: "${app.github}"`);

    if (app.description && typeof app.description !== 'string')
      throw new Error(`${p} "description" must be a string if provided.`);

    if (app.dateAdded && typeof app.dateAdded !== 'string')
      throw new Error(`${p} "dateAdded" must be a string if provided.`);
    if (app.dateAdded && !/^\d{4}-\d{2}-\d{2}$/.test(app.dateAdded))
      throw new Error(`${p} "dateAdded" must be YYYY-MM-DD. Got: "${app.dateAdded}"`);

    if (app.access && !VALID_ACCESS.has(app.access))
      throw new Error(`${p} "access" must be one of: ${[...VALID_ACCESS].join(', ')}.`);

    if (app.dataType && (!Array.isArray(app.dataType) || !app.dataType.every(t => typeof t === 'string')))
      throw new Error(`${p} "dataType" must be an array of strings if provided.`);

    Object.keys(app).forEach(key => {
      if (!ALLOWED_KEYS.has(key))
        throw new Error(`${p} contains unexpected key "${key}".`);
    });
  });

  console.log(`✅ All ${apps.length} apps validated successfully!`);
  process.exit(0);
} catch (err) {
  console.error(`❌ Validation failed: ${err.message}`);
  process.exit(1);
}
