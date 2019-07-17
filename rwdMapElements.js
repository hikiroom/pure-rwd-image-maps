/*
* rwdMapElements
*
* Copyright (c) 2019 ひきこもり
* Licensed under the MIT license
* https://github.com/hikiroom/rwdMapElements
*/
(function () {
    'use strict';

    const mapImg = document.querySelectorAll('img[usemap]');
    const mapImgLen = mapImg.length;
    const resizeTiming = 50;
    let mapArr = [];
    let areaArr = [];
    let percentCoordsArr = [];
    let preCoords = [];
    let resizeTimer = null;
    const init = function () {
        for (let mapImgI = 0; mapImgI < mapImgLen; mapImgI++) {
            const mapName = mapImg[mapImgI].getAttribute('usemap').replace('#', '');

            mapArr = document.querySelector('map[name="' + mapName + '"]');
            areaArr[mapImgI] = mapArr.querySelectorAll('area');

            percentCoordsArr.push([]);

            setParam(mapImgI);
            setAreaCodes(mapImgI, true);
        }

        window.addEventListener('resize', resizeEve);
    };
    const setParam = function (elIdx) {
        const imgBaseH = parseInt(mapImg[elIdx].dataset.height, 10);
        const imgBaseW = parseInt(mapImg[elIdx].dataset.width, 10);
        const thisAreaArr = areaArr[elIdx];
        const areaArrLen = thisAreaArr.length;
        let thisPercentCoord = percentCoordsArr[elIdx];

        thisPercentCoord.push(new Array(areaArrLen));

        for (let areaI = 0; areaI < areaArrLen; areaI++) {
            const area = thisAreaArr[areaI];
            const coords = area.getAttribute('coords').split(',');

            thisPercentCoord[areaI] = [];

            for (let coordsI = 0, coordsLen = coords.length; coordsI < coordsLen; coordsI++) {
                const coord =  coords[coordsI];

                if (coordsI % 2 === 0) {
                    thisPercentCoord[areaI].push(Number(coord * 100 / imgBaseW));
                } else {
                    thisPercentCoord[areaI].push(Number(coord * 100 / imgBaseH));
                }
            }
        }
    };
    const setAreaCodes = function (elIdx, isInit) {
        const imgW = mapImg[elIdx].offsetWidth;
        const imgH = mapImg[elIdx].offsetHeight;
        const thisAreaArr = areaArr[elIdx];
        const areaArrLen = thisAreaArr.length;
        let thisPreCoords = [];

        if (isInit) {
            preCoords.push([]);
        }

        thisPreCoords = preCoords[elIdx];
        thisPreCoords.push(new Array(areaArrLen));

        for (let areaI = 0; areaI < areaArrLen; areaI++) {
            const area = thisAreaArr[areaI];
            const coords = area.getAttribute('coords').split(',');

            thisPreCoords[areaI] = [];

            for (let coordsI = 0; coordsI < coords.length; coordsI++) {
                const percent = percentCoordsArr[elIdx][areaI][coordsI];

                if (coordsI % 2 === 0) {
                    thisPreCoords[areaI][coordsI] = parseInt(percent * imgW / 100, 10);
                } else {
                    thisPreCoords[areaI][coordsI] = parseInt(percent * imgH / 100, 10);
                }
            }

            area.setAttribute('coords', thisPreCoords[areaI].toString());
        }
    };
    const resizeEve = function () {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(function () {
            for (let mapImgI = 0; mapImgI < mapImgLen; mapImgI++) {
                setAreaCodes(mapImgI, false);
            }
        }, resizeTiming);
    };

    if (mapImg.length) {
        init();
    }
}());
