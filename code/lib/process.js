
import { stopwords } from './stopwords.js'

export const process = function(t) {
  const tl = t.toLowerCase()
              .replace(/-/g,' ')
              .replace(/[^a-z ]/g,'')
              .split(' ')
              .filter((i) => { return i.length !== 0 })
              .filter((i) => { return !stopwords.includes(i)})
  return tl
}