import {qiniuFileUpload} from '../file-upload';
import ChooseVideoSuccessCallbackResult = WechatMiniprogram.ChooseVideoSuccessCallbackResult;

export interface UploadVideoItem {
    tempPath: string;
    fileName: string;
    duration: number;
    height: number;
    width: number;
    size: number;
    progress: number;
    completed: boolean;
    success: boolean;

    upload: () => void;
}

export class UploadVideoItemObj implements UploadVideoItem {
    public completed: boolean;
    public fileName: string;
    public progress: number;
    public success: boolean;
    public tempPath: string;
    public duration: number;
    public height: number;
    public width: number;
    public size: number;
    private readonly upToken: string;
    private readonly onChange: (result?: UploadVideoItemObj) => void;

    constructor(upToken: string, chooseRes: ChooseVideoSuccessCallbackResult, onChange: (result?: UploadVideoItemObj) => void) {
        this.upToken = upToken;
        this.tempPath = chooseRes.tempFilePath;
        const filePathSplit = this.tempPath.split('.');
        const suffix = filePathSplit[filePathSplit.length - 1];
        this.fileName = `item_cover_${Math.random().toString(36).substr(2)}_${new Date().getTime()}.${suffix}`;
        this.progress = 0;
        this.success = false;
        this.completed = false;
        this.duration = chooseRes.duration;
        this.height = chooseRes.height;
        this.width = chooseRes.width;
        this.size = chooseRes.size;
        this.onChange = onChange;
    }

    upload() {
        const uploadTask = qiniuFileUpload(this.tempPath, this.fileName, this.upToken, () => {
            this.completed = true;
            this.success = true;
            this.onChange(this);
        }, () => {
            this.completed = true;
            this.success = false;
            this.onChange(this);
        });
        uploadTask.onProgressUpdate(res => {
            this.progress = res.progress;
            this.onChange(this);
        });
    };
}