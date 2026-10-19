import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = path.resolve('.vitepress/dist')
const routes = ['', 'features', 'plugin-development', 'plugins', 'panes', 'sessions',
  'preferences', 'shortcuts', 'overview', 'build', 'install', 'licensing']

for (const route of routes) {
  const file = path.join(root, route, 'index.html')
  assert(fs.existsSync(file) && fs.statSync(file).size > 0, `Missing route /${route}/`)
  const html = fs.readFileSync(file, 'utf8')
  assert(html.includes('src="/media/logo-small.svg"'), `Wrong navigation artwork on /${route}/`)
  assert(html.includes('href="/media/logo-small.png"'), `Wrong favicon on /${route}/`)
}

// bind delivered artwork to the supplied square mark, not another logo with the same filename.
for (const [name, expected] of [
  ['logo-small.svg', '9c6b334d1a60119e834681ffb95acc8707128756f2e74f440e8f1aa3fa9b0a01'],
  ['logo-small.png', '941cd693d135e329344312e3466cded3a6294c951a7d640a9c8fe77141b2857a'],
]) {
  const delivered = fs.readFileSync(path.join(root, 'media', name))
  assert.equal(createHash('sha256').update(delivered).digest('hex'), expected, `Unapproved ${name}`)
  assert.deepEqual(delivered, fs.readFileSync(path.join('docs/public/media', name)))
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
