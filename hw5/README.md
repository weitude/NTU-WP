# Web Programming HW#5

## 操作說明

欲正確檢視所呈現的網頁，應該要進行以下操作

（請確保電腦具備 node.js 等套件）

先各別去 `frontend`, `backend` directory 執行：

```
yarn install
```

接著回到 `hw5` directory 執行：

```
yarn server
yarn start
```

## 基本要求

+ 按下 `start game` 會通知 server 產生一個新數字
+ 按下 `guess` 會先判斷是否為數字，接著判斷是否在 [1, 100]
+ 完成 `fronend/src/axios.js`、`backend/core/getNumber.js` 以及 `backend/routes/guess.js`

## 其他更動

+ 每次產生新遊戲時，會在 console.log 顯示 ans
+

---

綜合以上，我認為我已達成所有基本要求