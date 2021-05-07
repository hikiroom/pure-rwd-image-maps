import PureRwdImageMaps from '../src/ts/pureRwdImageMaps';

const AREA_SQUARE_COORDS = '50,50,181,180';
const AREA_TRIANGLE_COORDS = '401,174,336,288,465,288';
const AREA_CIRCLE_COORDS = '685,386,65';

const IMAGE_NATURAL_WIDTH = 800;
const IMAGE_NATURAL_HEIGHT = 500;
const IMAGE_OFFSET_WIDTH = 400;
const IMAGE_OFFSET_HEIGHT = 250;

interface ComputeCoordsUserOptions {
    horizontal?: boolean;
    vertical?: boolean;
}
interface ComputeCoordsOptions {
    horizontal: boolean;
    vertical: boolean;
}
const computeCoords = (coords: string, userOptions: ComputeCoordsUserOptions = {}): string => {
    const options: ComputeCoordsOptions = Object.assign({
        horizontal: true,
        vertical: true,
    }, userOptions);
    const percentWidth = IMAGE_OFFSET_WIDTH / IMAGE_NATURAL_WIDTH;
    const percentHeight = IMAGE_OFFSET_HEIGHT / IMAGE_NATURAL_HEIGHT;

    return coords.split(',').map((coord, i) => {
        if (i % 2 === 0 && options.horizontal) {
            return Number(coord) * percentWidth;
        } else if (i % 2 !== 0 && options.vertical) {
            return Number(coord) * percentHeight;
        } else {
            return Number(coord);
        }
    }).join(',');
}

beforeAll(() => {
    Object.defineProperties(HTMLImageElement.prototype, {
        naturalWidth: {
            get: () => IMAGE_NATURAL_WIDTH
        },
        naturalHeight: {
            get: () => IMAGE_NATURAL_HEIGHT
        },
        offsetWidth: {
            get: () => IMAGE_OFFSET_WIDTH
        },
        offsetHeight: {
            get: () => IMAGE_OFFSET_HEIGHT
        },
    });
    
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
})
beforeEach(() => {
    document.body.innerHTML = `
        <img src="./image/sample.png" alt="" usemap="#sample1">
        <map name="sample1">
            <area alt="square" title="square" href="#" coords="${AREA_SQUARE_COORDS}" shape="rect">
            <area alt="triangle" title="triangle" href="#" coords="${AREA_TRIANGLE_COORDS}" shape="polygon">
            <area alt="circle" title="circle" href="#" coords="${AREA_CIRCLE_COORDS}" shape="circle">
        </map>
    `;
});
test('init', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target);
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(computeCoords(AREA_SQUARE_COORDS));
    expect(coordsMock.mock.results[1].value).toBe(computeCoords(AREA_TRIANGLE_COORDS));
    expect(coordsMock.mock.results[2].value).toBe(computeCoords(AREA_CIRCLE_COORDS));
});
test('autoRwd:false', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target, {
        autoRwd: false,
    });
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(AREA_SQUARE_COORDS);
    expect(coordsMock.mock.results[1].value).toBe(AREA_TRIANGLE_COORDS);
    expect(coordsMock.mock.results[2].value).toBe(AREA_CIRCLE_COORDS);
});
test('vertical:false', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target, {
        vertical: false,
    });
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(computeCoords(AREA_SQUARE_COORDS, {
        vertical: false,
    }));
    expect(coordsMock.mock.results[1].value).toBe(computeCoords(AREA_TRIANGLE_COORDS, {
        vertical: false,
    }));
    expect(coordsMock.mock.results[2].value).toBe(computeCoords(AREA_CIRCLE_COORDS, {
        vertical: false,
    }));
});
test('horizontal:false', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target, {
        horizontal: false,
    });
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(computeCoords(AREA_SQUARE_COORDS, {
        horizontal: false,
    }));
    expect(coordsMock.mock.results[1].value).toBe(computeCoords(AREA_TRIANGLE_COORDS, {
        horizontal: false,
    }));
    expect(coordsMock.mock.results[2].value).toBe(computeCoords(AREA_CIRCLE_COORDS, {
        horizontal: false,
    }));
});
test('toRwd', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target, {
        autoRwd: false
    });
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(AREA_SQUARE_COORDS);
    expect(coordsMock.mock.results[1].value).toBe(AREA_TRIANGLE_COORDS);
    expect(coordsMock.mock.results[2].value).toBe(AREA_CIRCLE_COORDS);

    pureRwdImageMaps.toRwd();
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[3].value).toBe(computeCoords(AREA_SQUARE_COORDS));
    expect(coordsMock.mock.results[4].value).toBe(computeCoords(AREA_TRIANGLE_COORDS));
    expect(coordsMock.mock.results[5].value).toBe(computeCoords(AREA_CIRCLE_COORDS));
});
test('toStatic', () => {
    const target = document.querySelector<HTMLImageElement>('img[usemap="#sample1"]');
    if (!target) {
        throw new Error('target does not exist.');
    }
    const pureRwdImageMaps = new PureRwdImageMaps(target);
    const loadEvent = new CustomEvent('load');
    target.dispatchEvent(loadEvent);

    const coordsMock = jest.fn(value => value);
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[0].value).toBe(computeCoords(AREA_SQUARE_COORDS));
    expect(coordsMock.mock.results[1].value).toBe(computeCoords(AREA_TRIANGLE_COORDS));
    expect(coordsMock.mock.results[2].value).toBe(computeCoords(AREA_CIRCLE_COORDS));

    pureRwdImageMaps.toStatic();
    pureRwdImageMaps.targetAreas.forEach((item) => {
        coordsMock(item.coords);
    });

    expect(coordsMock.mock.results[3].value).toBe(AREA_SQUARE_COORDS);
    expect(coordsMock.mock.results[4].value).toBe(AREA_TRIANGLE_COORDS);
    expect(coordsMock.mock.results[5].value).toBe(AREA_CIRCLE_COORDS);
});