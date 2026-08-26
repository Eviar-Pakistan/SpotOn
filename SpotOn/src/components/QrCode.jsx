const SIZE = 25

function buildMatrix() {
  const matrix = Array.from({ length: SIZE }, () => Array(SIZE).fill(false))

  const placeFinder = (row, col) => {
    for (let i = 0; i < 7; i += 1) {
      for (let j = 0; j < 7; j += 1) {
        const edge = i === 0 || i === 6 || j === 0 || j === 6
        const inner = i >= 2 && i <= 4 && j >= 2 && j <= 4
        matrix[row + i][col + j] = edge || inner
      }
    }
  }

  placeFinder(0, 0)
  placeFinder(0, SIZE - 7)
  placeFinder(SIZE - 7, 0)

  for (let i = 8; i < SIZE - 8; i += 1) {
    matrix[6][i] = i % 2 === 0
    matrix[i][6] = i % 2 === 0
  }

  let seed = 2463534242
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const reserved =
        (row < 9 && col < 9) ||
        (row < 9 && col > SIZE - 10) ||
        (row > SIZE - 10 && col < 9) ||
        row === 6 ||
        col === 6
      if (reserved) continue
      seed = (seed ^ (seed << 13)) >>> 0
      seed = (seed ^ (seed >>> 17)) >>> 0
      seed = (seed ^ (seed << 5)) >>> 0
      matrix[row][col] = seed % 5 !== 0
    }
  }

  return matrix
}

const matrix = buildMatrix()

export default function QrCode() {
  const moduleSize = 8
  const quiet = 12
  const svgSize = SIZE * moduleSize + quiet * 2

  return (
    <svg
      className="qr-svg"
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      role="img"
      aria-label="Event table QR code"
    >
      <rect width={svgSize} height={svgSize} fill="#fff" rx="6" />
      {matrix.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={quiet + c * moduleSize}
              y={quiet + r * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill="#111"
            />
          ) : null,
        ),
      )}
    </svg>
  )
}
