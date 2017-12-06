## 要約

- Webkitの特定のバージョンでcss transitionと`calc()` を組み合わせた際にCSS使用量が爆上がりする
  - このとき、条件に依っては`calc()`の計算が終わらずに、サイズが変わらないことがある
- ユーザー環境で現在遭遇しうるのはiOS 11.2のSafariとSafari Tech Preview

## 影響のあるバージョン

- iOS 11.2のSafari
  - `Mozilla/5.0 (iPhone; CPU iPhone OS 11_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0 Mobile/15C107 Safari/604.1`
- Safari TP Release 44 (Safari 11.1, WebKit 13605.1.13.2)
  - `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.13 (KHTML, like Gecko) Version/11.1 Safari/605.1.13`

## 修正

- bug trackerのissue: https://bugs.webkit.org/show_bug.cgi?id=179982
- fix commit: https://github.com/WebKit/webkit/commit/b07064edc57a7789995d6134c20cd5471885f8d7
- [changeset 225141](https://trac.webkit.org/changeset/225141/webkit)のビルド以降で修正済みなことを確認した

## 再現

- [![https://gyazo.com/ec8006663ecc649c44d108d7e7587699](https://i.gyazo.com/ec8006663ecc649c44d108d7e7587699.gif)](https://gyazo.com/ec8006663ecc649c44d108d7e7587699)
  - 左上: Chrome 62.0
  - 左下: Safari 11.0.1
  - 右上: Safari TP Release 44
  - 右下: Webkit build r225141

- https://pastak.github.io/okiba/misc/webkit-issue-179982/repro.html
  - `test`と書かれたボタンを押すと`.test` を付与する
```css
#testdiv {
    height: 100%;
    background-color: inherit; /* needed to dodge the matched properties cache */
    border-bottom: 10px solid red;
    box-sizing: border-box;
}
#testdiv.test {
    transition: 1s;
    height: calc(100% - 200px); /* calc compares inequal with the same exact calc value */
}
#testdiv.test-np {
    transition: 1s;
    max-height: calc(100% - 200px); /* No Problem with max-height */
}
```
