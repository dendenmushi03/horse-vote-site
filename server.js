const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());

// 静的ファイルを正しくルートから配信
app.use(express.static(path.join(__dirname, 'public')));

// ads.txt や robots.txt のための明示ルーティング（念のため）
app.get('/ads.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ads.txt'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// 評価結果を一時保存する（開発用メモリ）
let evaluations = [];

// POSTで評価を受け取る
app.post('/submit', (req, res) => {
  const data = req.body;
  if (data) {
    evaluations.push(data);
    res.status(200).json({ message: '保存しました' });
  } else {
    res.status(400).json({ message: 'データがありません' });
  }
});

// 評価結果一覧取得
app.get('/results', (req, res) => {
  res.json(evaluations);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
