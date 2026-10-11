import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('.vitepress/dist')
const routes = ['', 'features', 'plugin-development', 'plugins', 'panes', 'sessions',
  'preferences', 'shortcuts', 'overview', 'build', 'install', 'licensing']

for (const route of routes) {
  const file = path.join(root, route, 'index.html')
  assert(fs.existsSync(file) && fs.statSync(file).size > 0, `Missing route /${route}/`)
}

const index = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8')
const full = fs.readFileSync(path.join(root, 'llms-full.txt'), 'utf8')
const links = [...index.matchAll(/\]\((https:\/\/among-terminal\.github\.io\/[^)]+)\)/g)]
const expected = new Set(routes.map(route => `${route || 'index'}.md`))
const actual = new Set(links.map(link => new URL(link[1]).pathname.slice(1)))
assert.deepEqual(actual, expected, 'LLM index must cover every public page')
for (const file of actual) {
  const generated = fs.readFileSync(path.join(root, file), 'utf8')
  const body = generated.replace(/^---\n[\s\S]*?\n---\n/, '').trim()
  assert(body.length > 100 && /^# /m.test(body), `Empty LLM page ${file}`)
  assert(full.includes(body), `Full text omitted content of ${file}`)
}
assert(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').includes('https://among-terminal.github.io/'), 'Sitemap missing')
assert(full.includes('## Protocol'), 'Plugin protocol missing from full text')
assert(full.includes('serde_json::from_str::<Value>'), 'Rust example changed in LLM output')
assert(full.includes('git clone https://github.com/Among-Terminal/among.git'), 'Quick install missing')

function checkPrivacy(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) checkPrivacy(file)
    else if (/\.(html|txt|md|js|json)$/.test(entry.name)) {
      const content = fs.readFileSync(file, 'utf8')
      assert(!/\/tmp\/opencode|\/home\/me\/|Among-Terminal\/ci-probe|sync-docs\.py|refresh-public-docs\.mjs/.test(content),
        `Internal content in ${path.relative(root, file)}`)
    }
  }
}
checkPrivacy(root)
console.log(`PASS ${routes.length} routes, both generated LLM files, per-page Markdown and privacy`)
