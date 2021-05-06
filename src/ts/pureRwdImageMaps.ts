class PureRwdImageMaps {
    readonly autoRwd: boolean;
    loaded: boolean = false;
    readonly name: string;
    readonly targetImg: HTMLImageElement;
    readonly targetMap: HTMLMapElement;
    readonly targetAreas: NodeListOf<HTMLAreaElement>;
    targetImgNaturalHeight: number = 0;
    targetImgNaturalWidth: number = 0;
    targetAreasNaturalCoords: string[] = [];
    resizeObserver: ResizeObserver|null = null;

    constructor(targetImg:HTMLImageElement, autoRwd = true) {
        this.autoRwd = autoRwd;

        const name = targetImg.getAttribute('usemap');
        if (!name) {
            throw new Error('target image do not have "usemap" attribute.');
        }
        this.name = name.replace('#', '');
        
        this.targetImg = targetImg;

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
        const _percentWidth = targetImageWidth / this.targetImgNaturalWidth;
        const percentWidth = _percentWidth < 1 ? _percentWidth : 1;
        const _percentHeight = targetImageHeight / this.targetImgNaturalHeight;
        const percentHeight = _percentHeight < 1 ? _percentHeight : 1;

        for (let i = this.targetAreas.length; i--;) {
            const coords = this.targetAreasNaturalCoords[i].split(',');
            const computedCoords: number[] = [];

            for (let j = coords.length; j--;) {
                const coord = Number(coords[j]);

                if ((j + 1) % 2 === 0) {
                    computedCoords[j] = coord * percentWidth;
                } else {
                    computedCoords[j] = coord * percentHeight;
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
