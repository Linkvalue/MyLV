const pad = i => i.toString().padStart(2, 0)
const formatDate = d =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`

module.exports = formatDate
