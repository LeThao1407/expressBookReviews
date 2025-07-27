const request = require('request');

function getAllBooks(callback) {
  request('http://localhost:3000/books', { json: true }, (err, res, body) => {
    if (err) return callback(err);
    callback(null, body);
  });
}

// Gọi hàm và in kết quả
getAllBooks((error, books) => {
  if (error) {
    console.error('Lỗi khi lấy sách:', error);
  } else {
    console.log('Danh sách sách:', books);
  }
});
