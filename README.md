# Pure RWD Image Maps

This is a library to make the coordinate data of the map element associated with the target img element responsive.

Sample: [https://hikiroom.github.io/pure-rwd-image-maps/sample/](https://hikiroom.github.io/pure-rwd-image-maps/sample/)

## Installation

### Script

Download code [here](https://raw.githubusercontent.com/hikiroom/pure-rwd-image-maps/master/dist/pureRwdImageMaps.js).

### ESM

```sh
$ npm install -S pure-rwd-image-maps
```

## Usage

```html
<img src="./image/sample.png" alt="" usemap="#sample1">
<map name="sample1">
    <area alt="square" title="square" href="#" coords="50,50,181,180" shape="rect">
    <area alt="triangle" title="triangle" href="#" coords="401,174,336,288,465,288 " shape="polygon">
    <area alt="circle" title="circle" href="#" coords="685,386,65" shape="circle">
</map>

<script>
const target = document.querySelector('img[usemap="#sample1"]');
const options = {
    autoRwd: true,
    vertical: true,
    horizontal: true,
};
const pureRwdImageMaps = new PureRwdImageMaps(target, options); // No problem without options
</script>
```

## API

### Options

`autoRwd`

| Type | Default value |
| --- | --- |
| Boolean | true |

Whether to make the coordinate data responsive or not at the same time as initializing the Object.

`vertical`

| Type | Default value |
| --- | --- |
| Boolean | true |

Whether to make the vertical axis responsive or not.

`horizontal`

| Type | Default value |
| --- | --- |
| Boolean | true |

Whether to make the horizontal axis responsive or not.

### Instance methods

`toRwd`

Make the coordinate data responsive.

*It cannot be executed until the src of the target img element is loaded. You can check if it is loaded or not with `pureRwdImageMaps.loaded`.*

`toStatic`

Unresponsive coordinate data.

*It cannot be executed until the src of the target img element is loaded. You can check if it is loaded or not with `pureRwdImageMaps.loaded`.*

## License

Licensed under the MIT license  
https://github.com/hikiroom/pure-rwd-image-maps/blob/master/LICENSE
