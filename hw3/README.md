# Web Programming HW#3

## 操作說明
欲正確檢視所呈現的網頁，應該要進行以下操作

（請確保電腦具備 node.js 等套件）
```
npm install
npm start
```

## 基本要求

+ 一開始只有顯示 input 欄位，將 footer 隱藏
+ 輸入資料後，將會成功加入 todo-list 中
+ 讓各個 checkbox 可勾選，同時更改 h1 標題樣式
+ 一旦存在 todo-item，將會顯示 footer，並正確顯示未完成數量

## 進階要求

+ 可以點擊叉叉以移除 todo-item，並更新未完成數量
+ 如果所有 item 都被刪掉，則再次隱藏 footer
+ 點擊 `All`, `Active`, 或 `Completed`，則會各別顯示其對應的狀態
+ 當存在已完成的 todo-items 時，會出現 `Clear completed` 按鈕，點擊後會刪除已完成之項目
+ 利用 placeholder 屬性，讓輸入框在沒有輸入值時，會顯示 "What needs to be done?" 提示

## 其他更動
+ 我的 src 資料夾中主要只有以下 3 個檔案：
  + `index.htnl`
  + `index.js`
  + `styles.css`
+ 我左下角的 `? left` 會根據 `All`, `Active` 及 `Completed` 去做變化，顯示當下總共有幾個 items

---

綜合以上，我認為我已達成所有基本要求與進階要求