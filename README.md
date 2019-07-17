# RWD MAP Element

画面上に表示されているすべての<map>要素をレスポンシブ化させるためのスクリプトです。

this script is convert all <map> element to RWD in screen

## 使い方(Usage)

`usemap`を付与しているimg要素に`data-width`と`data-height`属性を付与してください。
各属性値はimg要素が読み込んでいる画像の原寸サイズを指定してください。

please add `data-width` and `data-height` attributes to the img element that has `usemap`.
each attribute is please specified init size of loading image of img element.
```html
<img src="./sample.png" alt="" usemap="#sample-map" class="" data-width="200" data-height="100">
<map name="sample-map">
    <area shape="circle" coords="100,100,50" href="#" alt="" />
</map>
```

---
このREADME.mdはGoogle翻訳を頼りに翻訳しています。

this README.md is translate to using the google translate