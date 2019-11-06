import UploadFileSuccessCallback = WechatMiniprogram.UploadFileSuccessCallback;
import FileSystemManagerRemoveSavedFileFailCallback = WechatMiniprogram.FileSystemManagerRemoveSavedFileFailCallback;
import UploadTask = WechatMiniprogram.UploadTask;

export function qiniuFileUpload(file: any,
                                fileName: string,
                                token: string,
                                success?: UploadFileSuccessCallback,
                                fail?: FileSystemManagerRemoveSavedFileFailCallback): UploadTask {
    return wx.uploadFile({
        url: 'https://upload-z2.qiniup.com',
        name: 'file',
        filePath: file,
        formData: {
            token: token,
            key: fileName
        },
        success,
        fail
    });
}
