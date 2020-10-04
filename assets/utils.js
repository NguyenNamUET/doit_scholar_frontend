function formatNumber(number) {
  return number.toLocaleString('en-UK', {maximumFractionDigits: 0})
}

const fields_dict = {
  'Nghệ Thuật': 'Art',
  'Sinh Học': 'Biology',
  'Kinh Doanh': 'Business',
  'Khoa Học Máy Tính': 'Computer Science',
  'Hóa Học': 'Chemistry',
  'Kinh Tế': 'Economics',
  'Kỹ Nghệ': 'Engineering',
  'Khoa Học Môi Trường': 'Environmental Science',
  'Địa Lý': 'Geography',
  'Địa Chất Học': 'Geology',
  'Lịch Sử': 'History',
  'Khoa Học Vật Liệu': 'Materials Science',
  'Toán Học': 'Mathematics',
  'Y Tế': 'Medicine',
  'Triết Học': 'Philosophy',
  'Vật Lý': 'Physics',
  'Khoa Học Chính Trị': 'Political Science',
  'Tâm Lý Học': 'Psychology',
  'Xã Hội Học': 'Sociology',
}

const fields_type = [
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
  return title.trim().replace(/[\(|\[|{]([^)]*)[\)|\]|}]/g, '').replace(/\s+|\W+/g, '-').replace(/\-{2,}/g, '-').replace(/\-$/g,'')
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
    citation_count[citations[i].key] = citations[i].doc_count
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

function filteredKeys_v2(obj, filter) {
  var key, values = [];
  for (key in obj) {
    if (obj.hasOwnProperty(key) && filter.test(key)) {
      values.push(obj[key]);
    }
  }
  return values;
}

function isDictEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export {
  formatNumber,
  filteredKeys, filteredKeys_v2,
  fields_type,
  publication_type,
  formatTitle,
  chartColors,
  chart_prep,
  fields_dict,
  isDictEmpty
}
