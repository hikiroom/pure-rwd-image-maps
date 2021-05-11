interface PureRwdImageMapsOptions {
    autoRwd: boolean;
    vertical: boolean;
    horizontal: boolean;
}
class PureRwdImageMaps {
    readonly autoRwd: boolean;
    readonly vertical: boolean;
    readonly horizontal: boolean;
    loaded: boolean = false;
    readonly name: string;
    readonly targetImg: HTMLImageElement;
    readonly targetMap: HTMLMapElement;
    readonly targetAreas: NodeListOf<HTMLAreaElement>;
    targetImgNaturalHeight: number = 0;
    targetImgNaturalWidth: number = 0;
    targetAreasNaturalCoords: string[] = [];
    resizeObserver: ResizeObserver|null = null;

    constructor(targetImg:HTMLImageElement, userOptions: Partial<PureRwdImageMaps> = {}) {
        this.targetImg = targetImg;

        const options: PureRwdImageMapsOptions = Object.assign({
            autoRwd: true,
            vertical: true,
            horizontal: true,
        }, userOptions);
        this.autoRwd = options.autoRwd;
        this.vertical = options.vertical;
        this.horizontal = options.horizontal;

        const name = targetImg.getAttribute('usemap');
        if (!name) {
            throw new Error('target image do not have "usemap" attribute.');
        }
        this.name = name.replace('#', '');
        
        const targetMap = document.querySelector<HTMLMapElement>(`map[name=${this.name}]`);
        if (!targetMap) {
            throw new Error('do not exist "map element".');
        }
        this.targetMap = targetMap;

        const targetAreas = targetMap.querySelectorAll<HTMLAreaElement>('area');
        if (targetAreas.length <= 0) {
            throw new Error('do not exist "area element".');
        }
        this.targetAreas = targetAreas;

        targetImg.addEventListener('load', this.init.bind(this));
    }
    
    private init() {
        this.targetImgNaturalWidth = this.targetImg.naturalWidth;
        this.targetImgNaturalHeight = this.targetImg.naturalHeight;
        this.targetAreasNaturalCoords = Array.from(this.targetAreas).map((area: HTMLAreaElement) => area.coords);
        this.resizeObserver = new ResizeObserver(this.computeCoords.bind(this));
        this.loaded = true;

        if (this.autoRwd) {
            this.toRwd();
        }
    }
    private computeCoords() {
        const targetImageWidth = this.targetImg.offsetWidth;
        const targetImageHeight = this.targetImg.offsetHeight;
        const percentWidth = targetImageWidth / this.targetImgNaturalWidth;
        const percentHeight = targetImageHeight / this.targetImgNaturalHeight;

        for (let i = this.targetAreas.length; i--;) {
            const coords = this.targetAreasNaturalCoords[i].split(',');
            const computedCoords: number[] = [];

            for (let j = coords.length; j--;) {
                const coord = Number(coords[j]);

                if (j % 2 === 0 && this.horizontal) {
                    computedCoords[j] = coord * percentWidth;
                } else if (j % 2 !== 0 && this.vertical) {
                    computedCoords[j] = coord * percentHeight;
                } else {
                    computedCoords[j] = coord;
                }
            }

            this.targetAreas[i].coords = computedCoords.join(',');
        }
    }
    private resetCoords() {
        for (let i = this.targetAreas.length; i--;) {
            this.targetAreas[i].coords = this.targetAreasNaturalCoords[i];
        }
    }
    toRwd() {
        if (!this.loaded || !this.resizeObserver) {
            throw new Error('do not finished initialization.');
        }

        this.resizeObserver.observe(this.targetImg);
        this.computeCoords();
    }
    toStatic() {
        if (!this.loaded || !this.resizeObserver) {
            throw new Error('do not finished initialization.');
        }

        this.resizeObserver.disconnect();
        this.resetCoords();
    }
}

export default PureRwdImageMaps;
