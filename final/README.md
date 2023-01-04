# [111-1] Web Programming Final

**(Group 33) NTU Relief**

- 成員：
    - b10902062 資工二 林佳緯 （組長）
    - b10902070 資工二 林鈺翔
    - b10902057 資工二 陳翊嘉
- Demo 影片連結：[https://youtu.be/MaUb1rkepow](https://youtu.be/MaUb1rkepow)
- 簡介：

  題目的靈感來源是解憂雜貨店，我們發現台大學生普遍都有一些不為人知的煩惱需要抒發，但很多時候卻苦無門路，這些壓力、情緒累積到一定程度就容易發生憾事。因此我們希望可以打造一個讓大家安心說出自己心事的匿名環境，在這裡發文不會得到酸民的批評，只有專業的人士給你溫暖的建議，大家也可以在上面找尋和自己有相同困擾的人，可能會發現：其實你並不孤單，大家都一樣的煩惱。希望能藉此平台鼓勵及陪伴大家。

    - 註冊

      我們有提供註冊的服務，註冊時只需要提供將來要登入的帳號、密碼，以及 email 即可。不需要大家填寫過多的資料已保護隱私。

      email 的部分是未來希望能夠新增的功能：當使用者的問題有了解答後，會以 email 的方式通知，讓使用者能夠第一時間查看回覆。

    - 登入

      輸入帳號及密碼即可登入，若不想註冊的話，我們也有提供 guest 的方式一鍵登入（但會喪失發文功能）。

    - Main Page

      主頁面上方有搜尋的欄位，可以依據「關鍵字」或「tag」來搜尋。搜尋的公式為： `(關鍵字 in 標題 or 內文 or 回覆) && (tag 有出現任一個) && (回覆狀態符合)` 。

      下方顯示出來的問題則依據身份不同而有所區別：

        - 一般 User / Guest

          非 Admin User 所看到的會是所有「已回覆」的問題，他們可以點入任一問題進行查看，也可以點擊右下方的「＋」按鈕進行發問。

        - Admin User

          Admin User 所看到的會是所有「待回覆」的問題，他們一樣可以點入任一問題進行回覆，在他們的頁面中，右下方也有「＋」按鈕，但功能是將一般使用者變成
          Admin User。

    - Post Page

      顯示問題內容的頁面，點擊上方左上方的logo可以回到首頁，下方除了標題外分為兩欄，左邊是 Question，右邊是
      Response。在這裡，也會依據身份不同而有所區別：

        - 一般 User / Guest

          僅能查看回覆。

        - Admin User

          可以進行回覆。

- Deployed 連結：
    - frontend

  [https://nturelief.me/](https://nturelief.me/)

    - backend

  [https://nturelief.up.railway.app/](https://nturelief.up.railway.app/)

    - backend health check

  [https://nturelief.up.railway.app/api/health](https://nturelief.up.railway.app/api/health)

- GitHub 連結：[https://github.com/weitude/relief](https://github.com/weitude/relief)
- 使用之框架、第三方套件：
    - MUI (Material Design) & antd，讓 UI 更加美觀
    - lint-staged & husky，讓組員們在 commit 時會自動排版
    - react-router-dom 的 HashRouter, useNavigate, 和 useParams，跳轉網址
    - gh-pages，一鍵部署至 GitHub pages
    - mongoose，連線至 MongoDB
    - js-sha256，用來加密密碼
- 心得
    - B10902057：

      跟課堂的作業滿不一樣的是，這次的自由度很高，從題目、功能⋯⋯一切都要自己設定，這其實也是一大學問，要掌握好自己的能力跟所剩的時間，不能設定太宏大的目標以至於最後成品完成度過低，但如果想的太過簡單又會缺乏挑戰性讓這份作業變得無趣。

      另外也因為需要團隊合作，不能像自己寫 code
      時的隨心所欲，有很多的規範和細節需要討論，一個不注意就會被電到飛起（這裡感謝我的組員包容我 :))) ）。

      最後是學習到了不少 git 使用，在一次次被自己雷到，把本機 git 搞爛的時候，都會無比感謝組長當時在 github 上開了保護 main
      ，讓我不至於雷到把整份 repo 弄爛 :))

      最後的最後，謝謝老師跟助教這學期的辛苦教導，謝謝我的組員們陪我一起完成了這份作業。

    - B10902070 :

      我認為除了運用所學技術外有兩項主要收穫

      一項是合作寫 code 的軟實力，細節的溝通以及全端的互相配合，必須透過共同的規範或是文件紀錄，確保運作順暢，以及寫出
      readable code 的能力是需要培養，不然會被電飛，實際案例是我命名都全小寫，然後被整份魔改成駝峰命名法 = =

      另一項是對整份專案的責任感，自己 speed run 寫 code 的時候完全可以只為了 work 就寫很醜，但會導致後續維護困難，以及有時就是自信爆棚想要直接推上
      main，連測試都懶，但因為需要對組員以及專案負責，因此必須盡到自己的義務（這就是為什麼這次 project 只有我沒把 branch 搞爆
      嘿嘿

    - B10902062 :

      我非常喜歡這門課，學的全是很實用的知識，謝謝老師給我們期末 project 這個開放式的作業，讓我有機會與組員一同完成心中的想法。

# localhost 安裝流程

假設 root directory 為 final，以下指令皆在此 root directory 執行：

```
yarn install:all
```

接著在兩個視窗分別執行：

```
yarn server
```

```
yarn start
```

（axios 預設是連接到 railway，非 local 端）

## 帳密

1. User:

   帳號：test1；密碼：test1

2. Admin:

   帳號：1；密碼：123

# 組員之負責項目

## 林佳緯

### backend

- 整理 router，將其切成多個檔案（模組化）
- 撰寫 Dockerfile，將其部署到 Railway.app

### frontend

- 完成 SignIn, SignUp, Home, NavigationBar 等使用者使用畫面
- 撰寫 useRelief 的 `createContext` 檔案，讓整個網站的變數可以即時渲染
- 調整 css，使網站更加美觀，並大多數支援 RWD
- 轉接 api 至後端

### others

- 擔任組長，統整程式協作
- 錄製 Demo 影片

## 林鈺翔

### backend

- DB(mongodb)
- backend(express)

## frontend

- axios

| path         | 封包型別 | 功能                                         | 輸入                          |
|--------------|------|--------------------------------------------|-----------------------------|
| API_signup   | post | 計算hash, 新增使用者到DB                           | name, email, password, role |
| API_signin   | get  | 用name去DB找資料, 判斷密碼是否正確                      | name, password              |
| API_post     | post | 發文, 存進DB                                   | title, question, tag        |
| API_reply    | post | 更新Card的response                            | id, response                |
| API_opencard | get  | 用id抓單筆資料，並阻擋非admin查看未回覆的文                  | id, isAdmin                 |
| API_promote  | post | 用username抓資料並把role改成admin                  | name                        |
| API_search   | get  | 抓 filter 對應的資料 (string or tag) and isReply | target, tag, isReply        |

## 陳翊嘉

### frontend

- UserPage

  給一般使用者（含 Guest）看的頁面。

    - （Guest / User）首頁登入後顯示的畫面。
    - 一開始會從後端拿資料， render 出所有已回覆的問題（像一張張卡片的樣子）
    - 每篇已回覆的問題在這個頁面會顯示「標題」、「內容預覽（約 150 字）」及「tag（共六個，有分色）」。
    - （已登入的 user ）右下方有新增問題的按鈕，點擊會跳出 New Post 的 Modal。
        - 標題及內文為必填
        - tag 可選 0 - 6 個
        - 填寫完畢按右下角 Submit，即可送出。

- Post

  顯示每篇問題完整內容及回覆的頁面。

    - 在 UserPage/AdminPage 點擊問題後，會跳轉至這裡。
    - 中間上方會顯示標題。
    - 下方分為「Questions」（左）及「Responses」（右）
        - 設計為兩欄式是為了方便「問題與回覆的對照」，兩邊都有使用 scroll ，滾動時能夠只選擇一邊。
        - 右邊的 Responses 欄位在以 User/ Guest 登入時，僅能查看回覆的內容；以 Admin 登入時則是可以撰寫欲回覆的內容。
