import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = path.resolve('.vitepress/dist')
const routes = ['', 'notifications', 'plugin-development', 'plugins', 'panes', 'sessions',
  'preferences', 'shortcuts', 'build', 'install', 'licensing']

for (const route of routes) {
  const file = path.join(root, route, 'index.html')
  assert(fs.existsSync(file) && fs.statSync(file).size > 0, `Missing route /${route}/`)
  const html = fs.readFileSync(file, 'utf8')
  assert(html.includes('src="/media/logo-small.svg"'), `Wrong navigation artwork on /${route}/`)
  assert(html.includes('src="/media/logo-small-cream.svg"'), `Wrong dark navigation artwork on /${route}/`)
  assert(html.includes('href="/media/logo-small.png"'), `Wrong favicon on /${route}/`)
  const source = fs.readFileSync(path.join('docs', route, 'index.md'), 'utf8')
  const prose = source.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
  assert(!/[\u2013\u2014]/u.test(prose), `Prose contains an en or em dash on /${route}/`)
  assert(!/\*\*/.test(prose), `Decorative bold text on /${route}/`)
  assert(!/\p{Script=Cyrillic}|\p{Extended_Pictographic}/u.test(prose), `Non-English text or emoji on /${route}/`)
}

// Hashes bind the delivered artwork to the approved square mark.
for (const [name, expected] of [
  ['logo-small.svg', 'e0e8e101f2d3226a09bb4a2c25ff3976c7480b36bcb8d0e807eab81fba749e98'],
  ['logo-small-cream.svg', '488c2a20e29a2f4f785c464f56f2b77eaa026f17a7bd75795ae32cd8f58ad9cf'],
  ['logo-small.png', '8094722ae0cae734a62f66de604628644e13eafa600eeae1ba80db919191bb18'],
]) {
  const delivered = fs.readFileSync(path.join(root, 'media', name))
  assert.equal(createHash('sha256').update(delivered).digest('hex'), expected, `Unapproved ${name}`)
  assert.deepEqual(delivered, fs.readFileSync(path.join('docs/public/media', name)))
}

// The captured media manifest binds every published still and recording to
// the scene output that was reviewed. Feature clips reused from the approved
// 0.1.0 feature set carry their own pinned hashes.
const captured = JSON.parse(fs.readFileSync('docs/media.json', 'utf8'))
const appMedia = new Set([
  'session-restore.png',
  'plugin-off.png', 'plugin-on.png', 'panes.mp4', 'panes-poster.png',
  'overview.mp4', 'overview-poster.png',
  'notification-return.mp4', 'notification-return-poster.png', 'desktop-notification.png',
])
const approvedMedia = new Map([
  ['session-restore.mp4', 'e8cbac92b31982868fd9f5592bc274a3383750181830a399448cfcd5d8cd2c6f'],
  ['session-restore-poster.png', 'a247abae051ce8f7e69eb76c1ddce764b6ec9fbba9ce51d561c8ce1f5c541a54'],
  ['split-resize.mp4', 'd7ab7801424ac2b424d8065793ec282fb14f0df191f5def0a5c89cf311fcccbe'],
  ['split-resize-poster.png', '43c840e606f81eb11152d6883f15cc98aa659f087975cb1c3e1553146d8ab4f0'],
  ['keyboard-resize.mp4', '7798f9fece53b528a796572d71d2a99d61c37204e216f7183dc72bc513cc818c'],
  ['keyboard-resize-poster.png', 'e73e93276985163992a7d4da31d843468a8baedf8027a42c88d7f385bf051813'],
  ['mouse-resize.mp4', 'fecc80428ac661eb36f1593de4f0884c0d00a2ffe94ab1553f0f30f9aab154aa'],
  ['mouse-resize-poster.png', 'ef003dc730da95145a9b4d57ef658e3f4488d69407f62fecd9a89f4d7e4eb89c'],
  ['pane-drag.mp4', '7365769fdcc78cd723caaf7cc19bd9a53e06d041a591bef9543db17d0e912cec'],
  ['pane-drag-poster.png', '45803f6f8e53cc21658b19c4f09ba85f67ea6cc75bfa35e2edafbfe7ee467ec2'],
  ['workspaces.mp4', 'a3e53b2afb8e12389045ba22aa5ecd0503fd622d1ac7f63bba32f1d6411fa629'],
  ['workspaces-poster.png', '17190d35c99fe2f7086798ce4e4b8a99a96141e2c2c6be11983ddadfa5661dfa'],
  ['sidebar.mp4', 'e74997d9672c267ede756b52388adce34039ee6cb4a5b466daea1a0309d7315a'],
  ['sidebar-poster.png', '233c634d49ebf91a0795532c6e59b20f7532842deda6a959db90ce14815ed292'],
  ['theme-switch.mp4', '45b1792a437a18e24e37fec0479c07d36ee5f6cb4c6294607e68f5e7e405a499'],
  ['theme-switch-poster.png', '1f80851596ff9b3f2b72a683a0753dc2c0a2c1bb750e3bc7827a08ac06d95320'],
])
const mediaFiles = [
  ...fs.readdirSync('docs/public/media/app').map(name => ['app', name]),
  ...fs.readdirSync('docs/public/media/preferences').map(name => ['preferences', name]),
].filter(([, name]) => /\.(?:png|mp4)$/.test(name))
assert.deepEqual(
  new Set(mediaFiles.map(([, name]) => name)),
  new Set([...Object.keys(captured.assets), ...approvedMedia.keys()]),
  'Media manifest must list every published still and recording',
)
for (const [directory, name] of mediaFiles) {
  const file = path.join('docs/public/media', directory, name)
  const bytes = fs.readFileSync(file)
  const entry = captured.assets[name]
  const approved = approvedMedia.get(name)
  assert(entry || approved, `Published media is missing from the manifest: ${name}`)
  if (entry) {
    assert.equal(bytes.length, entry.bytes, `Media size changed: ${name}`)
  }
  assert.equal(
    createHash('sha256').update(bytes).digest('hex'),
    entry ? entry.sha256 : approved,
    `Media does not match the reviewed artwork: ${name}`,
  )
  assert.equal(
    appMedia.has(name) || approvedMedia.has(name),
    directory === 'app',
    `Media is in the wrong directory: ${name}`,
  )
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
