"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileUpload_1 = require("../file-upload");
var UploadFileItemObj = (function () {
    function UploadFileItemObj(upToken, chooseRes, cb) {
        this.upToken = upToken;
        this.tempPath = chooseRes.tempFilePaths[0];
        var filePathSplit = this.tempPath.split('.');
        var suffix = filePathSplit[filePathSplit.length - 1];
        this.fileName = "item_cover_" + Math.random().toString(36).substr(2) + "_" + new Date().getTime() + "." + suffix;
        console.log(chooseRes instanceof wx.ChooseImageSuccessCallbackResult);
        this.duration = 0;
        this.width = 0;
        this.height = 0;
        this.size = 0;
        this.progress = 0;
        this.success = false;
        this.completed = false;
        this.cb = cb;
    }
    UploadFileItemObj.prototype.upload = function () {
        var _this = this;
        var uploadTask = fileUpload_1.qiniuFileUpload(this.tempPath, this.fileName, this.upToken, function () {
            _this.completed = true;
            _this.success = true;
            _this.cb(_this);
        }, function () {
            _this.completed = true;
            _this.success = false;
            _this.cb(_this);
        });
        uploadTask.onProgressUpdate(function (res) {
            _this.progress = res.progress;
            _this.cb(_this);
        });
    };
    return UploadFileItemObj;
}());
exports.UploadFileItemObj = UploadFileItemObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWZpbGUtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVwbG9hZC1maWxlLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBOEM7QUFnQjlDO0lBYUksMkJBQVksT0FBZSxFQUFFLFNBQW9GLEVBQUUsRUFBcUM7UUFDcEosSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBSSxNQUFRLENBQUM7UUFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLFlBQVksRUFBRSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxrQ0FBTSxHQUFiO1FBQUEsaUJBY0M7UUFiRyxJQUFNLFVBQVUsR0FBRyw0QkFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzNFLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUFFO1lBQ0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFBLEdBQUc7WUFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0wsd0JBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cWluaXVGaWxlVXBsb2FkfSBmcm9tICcuLi9maWxlVXBsb2FkJztcblxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRGaWxlSXRlbSB7XG4gICAgdGVtcFBhdGg6IHN0cmluZztcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIGR1cmF0aW9uOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBzaXplOiBudW1iZXI7XG4gICAgcHJvZ3Jlc3M6IG51bWJlcjtcbiAgICBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgc3VjY2VzczogYm9vbGVhbjtcblxuICAgIHVwbG9hZDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFVwbG9hZEZpbGVJdGVtT2JqIGltcGxlbWVudHMgVXBsb2FkRmlsZUl0ZW0ge1xuICAgIHB1YmxpYyBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgcHVibGljIGR1cmF0aW9uOiBudW1iZXI7XG4gICAgcHVibGljIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyO1xuICAgIHB1YmxpYyBzaXplOiBudW1iZXI7XG4gICAgcHVibGljIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgcHVibGljIHRlbXBQYXRoOiBzdHJpbmc7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSB1cFRva2VuOiBzdHJpbmc7XG4gICAgcHVibGljIGNiOiAocmVzdWx0OiBVcGxvYWRGaWxlSXRlbSkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHVwVG9rZW46IHN0cmluZywgY2hvb3NlUmVzOiB3eC5DaG9vc2VJbWFnZVN1Y2Nlc3NDYWxsYmFja1Jlc3VsdCB8IHd4LkNob29zZVZpZGVvU3VjY2Vzc0NhbGxiYWNrUmVzdWx0LCBjYjogKHJlc3VsdD86IFVwbG9hZEZpbGVJdGVtKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMudXBUb2tlbiA9IHVwVG9rZW47XG4gICAgICAgIHRoaXMudGVtcFBhdGggPSBjaG9vc2VSZXMudGVtcEZpbGVQYXRoc1swXTtcbiAgICAgICAgY29uc3QgZmlsZVBhdGhTcGxpdCA9IHRoaXMudGVtcFBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gZmlsZVBhdGhTcGxpdFtmaWxlUGF0aFNwbGl0Lmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLmZpbGVOYW1lID0gYGl0ZW1fY292ZXJfJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMil9XyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9LiR7c3VmZml4fWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGNob29zZVJlcyBpbnN0YW5jZW9mIHd4LkNob29zZUltYWdlU3VjY2Vzc0NhbGxiYWNrUmVzdWx0KTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZFRhc2sgPSBxaW5pdUZpbGVVcGxvYWQodGhpcy50ZW1wUGF0aCwgdGhpcy5maWxlTmFtZSwgdGhpcy51cFRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jYih0aGlzKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNiKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdXBsb2FkVGFzay5vblByb2dyZXNzVXBkYXRlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gcmVzLnByb2dyZXNzO1xuICAgICAgICAgICAgdGhpcy5jYih0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn0iXX0=