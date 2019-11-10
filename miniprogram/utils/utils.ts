import {Share} from './types/share';
import {Student} from './types/student';
import {User} from './types/user';

export class Utils {
    public static formatNumber(n: number) {
        const str = n.toString();
        return str[1] ? str : '0' + str;
    }

    public static formatTime(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
    }


    public static dateFormat(date: Date, fmt: string): string {
        const o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k as keyof object]) : (('00' + o[k as keyof object]).substr(('' + o[k as keyof object]).length)));
        }
        return fmt;
    }

    public static timeDiff(date: Date): string {
        const sTime = date.getTime();
        const nowTime = new Date().getTime();
        const d = (nowTime - sTime) / 1000;
        if (d < 60) {
            return `${Math.floor(d)} 秒前`;
        } else if (d < 60 * 60) {
            return `${Math.floor(d / 60)} 分钟前`;
        } else if (d < 60 * 60 * 24) {
            return `${Math.floor(d / 60 / 60)} 小时前`;
        } else if (d < 60 * 60 * 24 * 7) {
            return `${Math.floor(d / 60 / 60 / 24)} 天前`;
        } else {
            return this.dateFormat(date, 'yyyy-MM-dd hh:mm:ss');
        }
    }

    public static childSerialize(...children: Student[]) {
        if (!children) {
            return;
        }
        children.map(i => {
            i.classView = `${i.grade.name} ${i.class.name}`;
            return i;
        });

    }

    public static shareSerialize(alpha: number, ...shares: Share[]) {
        if (!shares) {
            return;
        }
        shares.map(i => {
            const s = i.media.height / i.media.width;
            if (i.media.width >= i.media.height) {
                if (i.media.width > 200) {
                    i.media.vWidth = 200 * alpha + 'px';
                    i.media.vHeight = 200 * s * alpha + 'px';
                }
            } else {
                if (i.media.height > 200) {
                    i.media.vHeight = 200 * alpha + 'px';
                    i.media.vWidth = 200 / s * alpha + 'px';
                }
            }
            i.timeDiff = this.timeDiff(new Date(i.createdAt));
            i.likeUsersView = this.usersNameStr(i.likeUsers);
            return i;
        });
    }

    public static usersNameStr(users: User[]): string {
        if (!users) {
            return '';
        }
        return users.map(i => {
            return i.nickName;
        }).join(',');
    }
}
