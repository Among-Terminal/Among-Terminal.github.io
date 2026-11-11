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
  const source = fs.readFileSync(path.join('docs', route, 'index.md'), 'utf8')
  const prose = source.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
  assert(!/[\u2013\u2014]/u.test(prose), `Prose contains an en or em dash on /${route}/`)
  assert(!/\*\*/.test(prose), `Decorative bold text on /${route}/`)
  assert(!/\p{Script=Cyrillic}|\p{Extended_Pictographic}/u.test(prose), `Non-English text or emoji on /${route}/`)
}

// Hashes bind the delivered artwork to the approved square mark.
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
assert(full.includes('https://github.com/Among-Terminal/among-plugin-template'), 'Plugin author handoff missing')
assert(full.includes('https://github.com/Among-Terminal/among/blob/main/CONTRIBUTING.md'), 'Contributor handoff missing')
assert(full.includes('https://github.com/Among-Terminal/among/blob/main/docs/build.md'), 'Build guide handoff missing')
assert(!/^## (Protocol|Writing one|Host to plugin|Plugin to host)$/m.test(full), 'Plugin author reference belongs in the template repository')
assert(!full.includes('serde_json::from_str::<Value>'), 'Plugin implementation example remains on the user site')
assert(full.includes('## Access review') && full.includes('### Reduced protection'), 'Plugin access guidance missing')
assert(full.includes('## Desktop notification integration'), 'Notification installation guidance missing')

const origin = 'https://among-terminal.github.io'
const external = new Set()
let localTargets = 0
let anchors = 0
let media = 0

function decodeAttribute(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }
    if (named[entity]) return named[entity]
    const hex = entity[2].toLowerCase() === 'x'
    return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10))
  })
}

function checkTarget(value, source) {
  const target = decodeAttribute(value)
  if (target.startsWith('data:')) return
  const relative = path.relative(root, source).split(path.sep).join('/')
  const url = new URL(target, `${origin}/${relative}`)
  assert(['https:', 'http:', 'mailto:'].includes(url.protocol), `Unsupported URL ${target} in ${relative}`)
  if (url.origin !== origin) {
    external.add(url.href)
    return
  }
  const pathname = decodeURIComponent(url.pathname)
  let file = path.resolve(root, `.${pathname}`)
  assert(file.startsWith(`${root}${path.sep}`) || file === root, `Target escapes site: ${target}`)
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  else if (!fs.existsSync(file) && !path.extname(file)) file += '.html'
  assert(fs.existsSync(file) && fs.statSync(file).isFile(), `Broken target ${target} in ${relative}`)
  localTargets++
  if (pathname.startsWith('/media/')) media++
  if (url.hash && /\.(html|svg)$/.test(file)) {
    const ids = new Set([...fs.readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)]
      .map(match => decodeAttribute(match[1])))
    assert(ids.has(decodeURIComponent(url.hash.slice(1))), `Broken anchor ${target} in ${relative}`)
    anchors++
  }
}

function checkTargets(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) checkTargets(file)
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8')
      for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) checkTarget(match[1], file)
      for (const match of html.matchAll(/<img\b[^>]*>/g)) {
        assert(/\balt="[^"]+"/.test(match[0]), `Image without descriptive alt text in ${file}`)
      }
    } else if (entry.name.endsWith('.css')) {
      const css = fs.readFileSync(file, 'utf8')
      for (const match of css.matchAll(/url\(\s*['"]?([^\s'"()]+)['"]?\s*\)/g)) checkTarget(match[1], file)
    }
  }
}
checkTargets(root)


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
console.log(`PASS ${routes.length} routes, generated LLM files, per-page Markdown, ownership and privacy`)
console.log(`PASS ${localTargets} local targets, ${anchors} anchors and ${media} media references`)
console.log(`PASS syntax for ${external.size} external URLs; remote availability not checked (offline)`)
