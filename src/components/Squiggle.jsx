// Small hand-drawn looping arrow, in the spirit of the F1 system map.
// dir: 'lr' (points right/down-right), 'rl' (mirrored)
export default function Squiggle({ dir = 'lr', variant = 0 }) {
  const flip = dir === 'rl'
  // small curl-with-a-loop paths; subtle variation so no two match
  const variants = [
    { d: 'M 6,10 C 20,2 40,6 46,20 C 50,30 42,38 34,35 C 26,32 28,20 40,17 C 52,14 68,20 78,28', tip: 'M 78,28 L 68,26 M 78,28 L 74,18' },
    { d: 'M 5,8 C 18,1 38,4 45,17 C 50,27 43,37 34,34 C 25,31 27,19 39,16 C 51,13 69,22 79,31', tip: 'M 79,31 L 69,28 M 79,31 L 75,21' },
    { d: 'M 7,12 C 21,3 39,8 45,21 C 49,31 41,39 33,36 C 25,33 29,21 41,18 C 53,15 67,19 77,26', tip: 'M 77,26 L 67,24 M 77,26 L 73,17' },
    { d: 'M 6,9 C 19,2 39,5 46,19 C 51,29 42,38 34,35 C 26,32 27,20 40,17 C 53,14 70,24 80,32', tip: 'M 80,32 L 70,29 M 80,32 L 76,22' },
  ]
  const v = variants[variant % variants.length]
  return (
    <svg
      className="arrow"
      viewBox="0 0 86 42"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d={v.d} />
      <path d={v.tip} />
    </svg>
  )
}
