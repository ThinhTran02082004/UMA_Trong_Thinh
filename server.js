const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Route upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.send('Chưa chọn hình!');
  res.send(`<h2>Upload thành công!</h2><img src="/uploads/${req.file.filename}" width="300"/>`);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
