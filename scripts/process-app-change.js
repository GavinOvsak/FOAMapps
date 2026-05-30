import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appsPath = path.resolve(__dirname, '../public/data/apps.json')

const issueBody = process.env.ISSUE_BODY ?? ''

// Extract machine-readable JSON block embedded by the in-app form
const match = issueBody.replace(/\r\n/g, '\n').match(/<!-- FOAMAPPS_JSON\n([\s\S]*?)\n-->/)
if (!match) {
  console.error('No FOAMAPPS_JSON block found in issue body. Was this issue opened via the in-app form?')
  process.exit(1)
}

let change
try {
  change = JSON.parse(match[1])
} catch (e) {
  console.error('Failed to parse FOAMAPPS_JSON:', e.message)
  process.exit(1)
}

if (!change.action || !['add', 'edit', 'delete'].includes(change.action)) {
  console.error(`Unknown action: ${change.action}`)
  process.exit(1)
}

const apps = JSON.parse(fs.readFileSync(appsPath, 'utf-8'))

if (change.action === 'add') {
  if (!change.data) { console.error('Missing "data" for add action'); process.exit(1) }
  change.data.dateAdded = new Date().toISOString().split('T')[0]
  apps.push(change.data)
  apps.sort((a, b) => a.name.localeCompare(b.name))
  console.log(`Added app: ${change.data.name}`)

} else if (change.action === 'edit') {
  if (!change.appUrl) { console.error('Missing "appUrl" for edit action'); process.exit(1) }
  const idx = apps.findIndex(a => a.url === change.appUrl)
  if (idx === -1) {
    console.error(`App not found by URL: ${change.appUrl}`)
    process.exit(1)
  }
  const existing = apps[idx]
  apps[idx] = { ...existing, ...change.data }
  console.log(`Updated app: ${apps[idx].name}`)

} else if (change.action === 'delete') {
  if (!change.appUrl) { console.error('Missing "appUrl" for delete action'); process.exit(1) }
  const idx = apps.findIndex(a => a.url === change.appUrl)
  if (idx === -1) {
    console.error(`App not found by URL: ${change.appUrl}`)
    process.exit(1)
  }
  const removed = apps.splice(idx, 1)[0]
  console.log(`Removed app: ${removed.name}`)
}

fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2) + '\n')
console.log(`apps.json updated (${apps.length} apps total)`)
