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

const host = 'https://compasify.com'

function formatNumber(number) {
  return number.toLocaleString('en-UK', {maximumFractionDigits: 0})
}
function formatTitle(title) {
  //Ko hoạt động vs mọi ngôn ngữ, check hàm ở dưới genBibtex
  return title.trim().replace(/[\(|\[|{]([^)]*)[\)|\]|}]/g, '').replace(/\s+|\W+/g, '-').replace(/\-{2,}/g, '-').replace(/\-$/g,'')
}

function genBibtex(paper_detail) {
  let key = formatTitle(paper_detail.author[0].name) + '-' + paper_detail?.year || ''
  let result = '@article{' + key + ',' + '<br>'

  let author = ''
  paper_detail.author.forEach(function (item, index) {
    author += item.name
    if (index < paper_detail.author.length - 1) {
      author += ' and '
    }
  })

  result = result.concat('<p>&emsp;\t' + 'doi = ' + '{' + paper_detail.doi + '}' + '</p>')
  result = result.concat('<p>&emsp;\t' + 'author = ' + '{' + author + '}' + '</p>')
  result = result.concat('<p>&emsp;\t' + 'year = ' + '{' + (paper_detail?.year || '' ) + '}' + '</p>')
  result = result.concat('<p>&emsp;' + 'journal = ' + '{' + (paper_detail?.venue || '') + '}' + '</p>')
  result = result.concat('<p>&emsp;' + 'title = ' + '{' + paper_detail.title + '}' + '</p>')
  result = result.concat('<p>}</p>')
  return result
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

function doughnut_chart_prep(datas) {
  let chartData = {}
  chartData.labels = Object.keys(datas)
  chartData.datasets = []
  let single_data = {}
  single_data.backgroundColor = []
  single_data.data = []
  Object.keys(datas).forEach(function(key) {
    let color = require('randomcolor')
    let randomColor = color()
    single_data.backgroundColor.push(randomColor)
    single_data.data.push(datas[key])
  });
  chartData.datasets.push(single_data)
  return chartData
}

function line_chart_prep(datas) {
  //data format:
  //[
  //  {
  //    id:
  //    name:
  //    years_count:
  //                [
  //                  {
  //                    year: value
  //                  }
  //                ]
  //  }
  //]

  let labels = new Set()
  let color = require('randomcolor')
  for (let item of datas) {
    let randomColor = color()
    let single_data = {
      label: item.name,
      borderColor: randomColor
    }
    // for (let count of item.years_count) {
    //   if (count)
    // }
  }
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
  isDictEmpty,
  doughnut_chart_prep,
  genBibtex,
  host,
  line_chart_prep
}
