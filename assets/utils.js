function formatNumber(number) {
  return number.toLocaleString('en-UK', {maximumFractionDigits: 0})
}
const fields_type = [
  'Tất Cả Lĩnh Vực',
  'Nghệ Thuật',
  'Sinh Học',
  'Kinh Doanh',
  'Khoa Học Máy Tính',
  'Hóa Học',
  'Kinh Tế',
  'Kỹ Nghệ',
  'Khoa Học Môi Trường',
  'Địa Lý',
  'Địa Chất Học',
  'Lịch Sử',
  'Khoa Học Vật Liệu',
  'Toán Học',
  'Y Tế',
  'Triết Học',
  'Vật Lý',
  'Khoa Học Chính Trị',
  'Tâm Lý Học',
  'Xã Hội Học',
]

const publication_type = [
  'Tất cả loại xuất bản',
  'Bài báo',
  'Bài điểm',
  'Hội nghị',
  'Nghiên cứu',
  'Báo cáo',
  'Thử nghiệm lâm sàng',
  'Biên tập',
  'Bình luận',
  'Phân tích siêu dữ liệu'
]

export {
  formatNumber,
  fields_type,
  publication_type
}
