import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

// The Hub publishes these three files unchanged and refuses anything that
// reaches another origin, so the template checks the same page contract here.
const PUBLISHED = ['/index.html', '/main.js', '/styles.css']
const document = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8')
const stylesheet = readFileSync(new URL('../public/styles.css', import.meta.url), 'utf8')
const entrypoint = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8')

test('the document mounts #app and references only published assets', () => {
  assert.match(document, /<main[^>]*\bid\s*=\s*(?:"app"|'app')/)
  const references = [...document.matchAll(/(?:src|href)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map((match) => match[1] ?? match[2])
  assert.ok(references.length > 0)
  for (const reference of references) assert.ok(PUBLISHED.includes(reference), reference)
})

test('the stylesheet neither imports nor reaches another origin', () => {
  assert.doesNotMatch(stylesheet, /@import/i)
  for (const match of stylesheet.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"]*))\s*\)/g)) {
    const reference = (match[1] ?? match[2] ?? match[3] ?? '').trim()
    assert.doesNotMatch(reference, /(?:[a-z][a-z0-9+.-]*:)?\/\//i)
  }
})

test('the entrypoint renders into the mounted element', () => {
  assert.match(entrypoint, /document\.querySelector\('#app'\)/)
})
