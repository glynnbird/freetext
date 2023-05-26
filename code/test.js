function encodeNonNegative (s, pad=' ') {
  const l = s.length
  
  console.log()
  if (l <= 92) {
    return String.fromCodePoint(33 + l) + pad + s
  }
  return '~' + encodeNonNegative(l.toString(10), '') + ' ' + s 
}


const n = 61251.24

console.log(encodeNonNegative(n.toString()))