# Web Programming HW#4

## 操作說明
欲正確檢視所呈現的網頁，應該要進行以下操作

（請確保電腦具備 node.js 等套件）
```
npm install
npm start
```

## 基本要求

+ 一開始會出現 Homepage，讓開始畫面能夠顯示出來
+ 製作 `Start Game` 按鈕，按下後會切換到 Board 模式，同時傳入相關參數
+ 完成 `freshBoard` 函式，透過 Hook 的方式來更改初始值
+ 踩地雷的核心架構則是透過 nested map 來實作
+ 在 Board 上加入 `updateFlag` 以及 `revealCell` 功能

## 進階要求

+ 在 Homepage 新增調整難度的功能，並在難度程度不合法時顯示錯誤
+ 在 reveal.js 中透過 BFS 演算法，同步開啟四周未被插旗子且不是地雷的 Cell
+ 實作 `Model`，讓結束時顯示遊戲結果，並且新增 `Try Again` 及 `Back to Home` 按鈕
+ 在 Dashboard 實作計時器，每個遊戲都從 0 開始，結束時會停留在當下的秒數

---

綜合以上，我認為我已達成所有基本要求與進階要求