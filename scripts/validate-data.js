import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('public/data/apps.json');

try {
  const content = fs.readFileSync(dataPath, 'utf8');
  const apps = JSON.parse(content);

  if (!Array.isArray(apps)) {
    throw new Error('apps.json must be a JSON array at the top level.');
  }

  const keys = new Set(['name', 'url', 'tags', 'github', 'description', 'dateAdded']);

  apps.forEach((app, idx) => {
    const errorPrefix = `App at index ${idx} (${app.name || 'unnamed'}):`;
    
    if (!app.name || typeof app.name !== 'string') {
      throw new Error(`${errorPrefix} "name" is required and must be a string.`);
    }
    if (!app.url || typeof app.url !== 'string') {
      throw new Error(`${errorPrefix} "url" is required and must be a string.`);
    }
    try {
      new URL(app.url);
    } catch {
      throw new Error(`${errorPrefix} "url" (${app.url}) is not a valid absolute URL.`);
    }
    if (!Array.isArray(app.tags) || !app.tags.every(t => typeof t === 'string')) {
      throw new Error(`${errorPrefix} "tags" must be an array of strings.`);
    }
    if (app.github && typeof app.github !== 'string') {
      throw new Error(`${errorPrefix} "github" must be a string if provided.`);
    }
    if (app.github && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(app.github)) {
      throw new Error(`${errorPrefix} "github" must be in the format "owner/repo". Got: "${app.github}"`);
    }
    if (app.description && typeof app.description !== 'string') {
      throw new Error(`${errorPrefix} "description" must be a string if provided.`);
    }
    if (app.dateAdded && typeof app.dateAdded !== 'string') {
      throw new Error(`${errorPrefix} "dateAdded" must be a string if provided.`);
    }
    if (app.dateAdded && !/^\d{4}-\d{2}-\d{2}$/.test(app.dateAdded)) {
      throw new Error(`${errorPrefix} "dateAdded" must be in YYYY-MM-DD format. Got: "${app.dateAdded}"`);
    }

    // Check for extraneous keys
    Object.keys(app).forEach(key => {
      if (!keys.has(key)) {
        throw new Error(`${errorPrefix} contains unexpected key "${key}".`);
      }
    });
  });

  console.log(`✅ All ${apps.length} apps validated successfully! Schema and JSON format are correct.`);
  process.exit(0);
} catch (err) {
  console.error(`❌ Validation failed: ${err.message}`);
  process.exit(1);
}
