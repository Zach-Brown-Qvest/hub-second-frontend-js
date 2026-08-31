const facts = [
  { label: 'Deployment type', value: 'frontend-js', accent: true },
  { label: 'Served from', value: location.host },
  { label: 'Rendered at', value: new Date().toISOString() },
]

const root = document.querySelector('#app')
root.replaceChildren()

const heading = document.createElement('h1')
heading.textContent = 'Second static frontend'
root.append(heading)

const lede = document.createElement('p')
lede.className = 'lede'
lede.textContent =
  'This page is the repository’s own HTML, CSS, and JavaScript. The Hub verified the immutable ' +
  'source revision, staged each asset, and published them together as one immutable release.'
root.append(lede)

const list = document.createElement('dl')
list.className = 'facts'
for (const fact of facts) {
  const item = document.createElement('div')
  item.className = 'fact'
  const term = document.createElement('dt')
  term.textContent = fact.label
  const value = document.createElement('dd')
  value.textContent = fact.value
  if (fact.accent) value.className = 'accent'
  item.append(term, value)
  list.append(item)
}
root.append(list)
