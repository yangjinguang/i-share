import {qiniuFileUpload} from '../file-upload';

export interface UploadImageItem {
    tempPath: string;
    fileName: string;
    progress: number;
    completed: boolean;
    success: boolean;

    upload: () => void;
}

export class UploadImageItemObj implements UploadImageItem {
    public completed: boolean;
    public fileName: string;
    public progress: number;
    public success: boolean;
    public tempPath: string;
    private readonly upToken: string;
    private readonly onChange: (result?: UploadImageItemObj) => void;

    constructor(upToken: string, path: string, fileNamePrefix: string, onChange: (result?: UploadImageItemObj) => void) {
        this.upToken = upToken;
        this.tempPath = path;
        const filePathSplit = this.tempPath.split('.');
        const suffix = filePathSplit[filePathSplit.length - 1];
        this.fileName = `${fileNamePrefix}_${Math.random().toString(36).substr(2)}_${new Date().getTime()}.${suffix}`;
        this.progress = 0;
        this.success = false;
        this.completed = false;
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