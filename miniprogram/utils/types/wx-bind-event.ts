export interface WxBindEvent {
    type: string;
    changedTouches: WxBindEventTouch[];
    currentTarget: WxTarget,
    detail: any;
    target: WxTarget;
    touches: WxBindEventTouch[];

}

export interface WxBindEventTouch {
    clientX: number;
    clientY: number;
    force: number;
    identifier: number;
    pageX: number;
    pageY: number;
}

export interface WxTarget {
    dataset: { [key: string]: any };
    id: string;
    offsetLeft: number;
    offsetTop: number;
}

