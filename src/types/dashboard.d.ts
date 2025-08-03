export type FormattedBooking = {
  id: string
  user: { name: string }
  tanggal: Date
  jenis: string
}

export type FormattedReview = {
  id: string
  user: { name: string }
  komentar: string
}
