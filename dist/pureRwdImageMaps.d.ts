interface PureRwdImageMapsUserOptions {
    autoRwd?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
}
declare class PureRwdImageMaps {
    readonly autoRwd: boolean;
    readonly vertical: boolean;
    readonly horizontal: boolean;
    loaded: boolean;
    readonly name: string;
    readonly targetImg: HTMLImageElement;
    readonly targetMap: HTMLMapElement;
    readonly targetAreas: NodeListOf<HTMLAreaElement>;
    targetImgNaturalHeight: number;
    targetImgNaturalWidth: number;
    targetAreasNaturalCoords: string[];
    resizeObserver: ResizeObserver | null;
    constructor(targetImg: HTMLImageElement, userOptions?: PureRwdImageMapsUserOptions);
    private init;
    private computeCoords;
    private resetCoords;
    toRwd(): void;
    toStatic(): void;
}
export default PureRwdImageMaps;
