# Web Programming HW#6

## 操作說明

欲正確檢視所呈現的網頁，應該要進行以下操作

（請確保電腦具備 node.js 等套件）

先各別去 `frontend`, `backend` directory 執行：

```
yarn install
```

然後要去自行設定 backend 裡面的 `.env.defaults` 檔案

最後回到 `hw6` directory 執行：

```
yarn server
yarn start
```

## 基本要求

+ `server.js` 作為啟動 server 的核心檔案
+ `scoreCard.js` 以及 `index.js` 用來設計 APIs
+ `db.js` 定義與 Mongoose 的連線
+ 設定 `.env` 與 `.env.defaults` 檔
+ `ScoreCard.js` 定義 ScoreCard DB schema
+ 完整完成 `CLEAR`, `ADD` 以及 `QUERY` 三個按鈕的功能

---

綜合以上，我認為我已達成所有基本要求