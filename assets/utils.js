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

function formatTitle(title) {
  return title.trim().replace(/[\(|\[|{]([^)]*)[\)|\]|}]/g, '').replace(/\s+|\W+/g, '-').replace(/\-{2,}/g, '-')
}

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

function chart_prep(citations) {
  let citation_count = {}
  for (let i=0;i<citations.length;i++) {
    if (isNaN(citation_count[citations[i].year])) {
      citation_count[citations[i].year] = 1
    }
    else
      citation_count[citations[i].year]++
  }
  return citation_count
}

function filteredKeys(obj, filter) {
  var key, keys = [];
  for (key in obj) {
    if (obj.hasOwnProperty(key) && filter.test(key)) {
      keys.push(key);
    }
  }
  return keys;
}
export {
  formatNumber,
  filteredKeys,
  fields_type,
  publication_type,
  formatTitle,
  chartColors,
  chart_prep
}
