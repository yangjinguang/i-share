"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.formatNumber = function (n) {
        var str = n.toString();
        return str[1] ? str : '0' + str;
    };
    Utils.formatTime = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
    };
    Utils.dateFormat = function (date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    };
    Utils.timeDiff = function (date) {
        var sTime = date.getTime();
        var nowTime = new Date().getTime();
        var d = (nowTime - sTime) / 1000;
        if (d < 60) {
            return Math.floor(d) + " \u79D2\u524D";
        }
        else if (d < 60 * 60) {
            return Math.floor(d / 60) + " \u5206\u949F\u524D";
        }
        else if (d < 60 * 60 * 24) {
            return Math.floor(d / 60 / 60) + " \u5C0F\u65F6\u524D";
        }
        else if (d < 60 * 60 * 24 * 7) {
            return Math.floor(d / 60 / 60 / 24) + " \u5929\u524D";
        }
        else {
            return this.dateFormat(date, 'yyyy-MM-dd hh:mm:ss');
        }
    };
    Utils.childSerialize = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        if (!children) {
            return;
        }
        children.map(function (i) {
            i.classView = i.grade.name + " " + i.class.name;
            return i;
        });
    };
    Utils.shareSerialize = function (alpha) {
        var _this = this;
        var shares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            shares[_i - 1] = arguments[_i];
        }
        if (!shares) {
            return;
        }
        shares.map(function (i) {
            var s = i.video.height / i.video.width;
            if (i.video.width >= i.video.height) {
                if (i.video.width > 200) {
                    i.video.vWidth = 200 * alpha + 'px';
                    i.video.vHeight = 200 * s * alpha + 'px';
                }
            }
            else {
                if (i.video.height > 200) {
                    i.video.vHeight = 200 * alpha + 'px';
                    i.video.vWidth = 200 / s * alpha + 'px';
                }
            }
            i.timeDiff = _this.timeDiff(i.createdAt);
            _this.childSerialize(i.child);
            i.likeUsersView = _this.usersNameStr(i.likeUsers);
            return i;
        });
    };
    Utils.usersNameStr = function (users) {
        if (!users) {
            return '';
        }
        return users.map(function (i) {
            return i.nickName;
        }).join(',');
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7SUErRkEsQ0FBQztJQTlGaUIsa0JBQVksR0FBMUIsVUFBMkIsQ0FBUztRQUNoQyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0lBRWEsZ0JBQVUsR0FBeEIsVUFBeUIsSUFBVTtRQUMvQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFakMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvSCxDQUFDO0lBR2EsZ0JBQVUsR0FBeEIsVUFBeUIsSUFBVSxFQUFFLEdBQVc7UUFDNUMsSUFBTSxDQUFDLEdBQUc7WUFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO1NBQzlCLENBQUM7UUFDRixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLElBQUksSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQWlCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBaUIsQ0FBQyxDQUFD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RyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQzNDO2FBQ0o7WUFDRCxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSxrQkFBWSxHQUExQixVQUEyQixLQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBL0ZELElBK0ZDO0FBL0ZZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTaGFyZX0gZnJvbSAnLi90eXBlcy9zaGFyZSc7XG5pbXBvcnQge1N0dWRlbnR9IGZyb20gJy4vdHlwZXMvc3R1ZGVudCc7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vdHlwZXMvdXNlcic7XG5cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXROdW1iZXIobjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHN0ciA9IG4udG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHN0clsxXSA/IHN0ciA6ICcwJyArIHN0cjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdFRpbWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICBjb25zdCBzZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldLm1hcCh0aGlzLmZvcm1hdE51bWJlcikuam9pbignLycpICsgJyAnICsgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAodGhpcy5mb3JtYXROdW1iZXIpLmpvaW4oJzonKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZUZvcm1hdChkYXRlOiBEYXRlLCBmbXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG8gPSB7XG4gICAgICAgICAgICAnTSsnOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxuICAgICAgICAgICAgJ2QrJzogZGF0ZS5nZXREYXRlKCksIC8v5pelXG4gICAgICAgICAgICAnaCsnOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XG4gICAgICAgICAgICAnbSsnOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcbiAgICAgICAgICAgICdzKyc6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxuICAgICAgICAgICAgJ3ErJzogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcbiAgICAgICAgICAgICdTJzogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxuICAgICAgICB9O1xuICAgICAgICBpZiAoLyh5KykvLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xuICAgICAgICBmb3IgKGxldCBrIGluIG8pIHtcbiAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKCcoJyArIGsgKyAnKScpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2sgYXMga2V5b2Ygb2JqZWN0XSkgOiAoKCcwMCcgKyBvW2sgYXMga2V5b2Ygb2JqZWN0XSkuc3Vic3RyKCgnJyArIG9bayBhcyBrZXlvZiBvYmplY3RdKS5sZW5ndGgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZtdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRpbWVEaWZmKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzVGltZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IGQgPSAobm93VGltZSAtIHNUaW1lKSAvIDEwMDA7XG4gICAgICAgIGlmIChkIDwgNjApIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLmZsb29yKGQpfSDnp5LliY1gO1xuICAgICAgICB9IGVsc2UgaWYgKGQgPCA2MCAqIDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkIC8gNjApfSDliIbpkp/liY1gO1xuICAgICAgICB9IGVsc2UgaWYgKGQgPCA2MCAqIDYwICogMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLmZsb29yKGQgLyA2MCAvIDYwKX0g5bCP5pe25YmNYDtcbiAgICAgICAgfSBlbHNlIGlmIChkIDwgNjAgKiA2MCAqIDI0ICogNykge1xuICAgICAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IoZCAvIDYwIC8gNjAgLyAyNCl9IOWkqeWJjWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0KGRhdGUsICd5eXl5LU1NLWRkIGhoOm1tOnNzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoaWxkU2VyaWFsaXplKC4uLmNoaWxkcmVuOiBTdHVkZW50W10pIHtcbiAgICAgICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuLm1hcChpID0+IHtcbiAgICAgICAgICAgIGkuY2xhc3NWaWV3ID0gYCR7aS5ncmFkZS5uYW1lfSAke2kuY2xhc3MubmFtZX1gO1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFyZVNlcmlhbGl6ZShhbHBoYTogbnVtYmVyLCAuLi5zaGFyZXM6IFNoYXJlW10pIHtcbiAgICAgICAgaWYgKCFzaGFyZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzaGFyZXMubWFwKGkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcyA9IGkudmlkZW8uaGVpZ2h0IC8gaS52aWRlby53aWR0aDtcbiAgICAgICAgICAgIGlmIChpLnZpZGVvLndpZHRoID49IGkudmlkZW8uaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGkudmlkZW8ud2lkdGggPiAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaS52aWRlby52V2lkdGggPSAyMDAgKiBhbHBoYSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIGkudmlkZW8udkhlaWdodCA9IDIwMCAqIHMgKiBhbHBoYSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaS52aWRlby5oZWlnaHQgPiAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaS52aWRlby52SGVpZ2h0ID0gMjAwICogYWxwaGEgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBpLnZpZGVvLnZXaWR0aCA9IDIwMCAvIHMgKiBhbHBoYSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaS50aW1lRGlmZiA9IHRoaXMudGltZURpZmYoaS5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFNlcmlhbGl6ZShpLmNoaWxkKTtcbiAgICAgICAgICAgIGkubGlrZVVzZXJzVmlldyA9IHRoaXMudXNlcnNOYW1lU3RyKGkubGlrZVVzZXJzKTtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHVzZXJzTmFtZVN0cih1c2VyczogVXNlcltdKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF1c2Vycykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2Vycy5tYXAoaSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaS5uaWNrTmFtZTtcbiAgICAgICAgfSkuam9pbignLCcpO1xuICAgIH1cbn1cbiJdfQ==