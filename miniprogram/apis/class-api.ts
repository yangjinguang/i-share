import {config} from '../utils/config';
import {HttpClient} from '../utils/http-client';
import {Grade} from '../utils/types/grade';
import {Class} from '../utils/types/class';

export class ClassApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public classTree(): Promise<Grade[]> {
        return this.http.get(`${config.apiBaseUrl}/class/tree`);
    }

    public gradeList(): Promise<Grade[]> {
        return this.http.get(`${config.apiBaseUrl}/grade`);
    }

    public classList(): Promise<Class[]> {
        return this.http.get(`${config.apiBaseUrl}/class`);
    }

    public classListByGradeId(gradeId: number): Promise<Class[]> {
        return this.http.get(`${config.apiBaseUrl}/class/byGradeId/${gradeId}`);
    }

    public createGrade(newGrade: Grade): Promise<Grade> {
        return this.http.post(`${config.apiBaseUrl}/grade`, newGrade);
    }

    public createClass(newClass: Class): Promise<Class> {
        return this.http.post(`${config.apiBaseUrl}/class`, newClass);
    }

    public updateClass(classId: number, newClass: Class): Promise<Class> {
        return this.http.put(`${config.apiBaseUrl}/class/${classId}`, newClass);
    }

    public updateGrade(gradeId: number, newGrade: Grade): Promise<Grade> {
        return this.http.put(`${config.apiBaseUrl}/grade/${gradeId}`, newGrade);
    }

    public updateClassOrder(classIds: number[]): Promise<Class> {
        return this.http.put(`${config.apiBaseUrl}/class/order`, classIds,);
    }

    public updateGradeOrder(gradeIds: number[]): Promise<Class> {
        return this.http.put(`${config.apiBaseUrl}/grade/order`, gradeIds,);
    }

    public getGrade(gradeId: number): Promise<Grade> {
        return this.http.get(`${config.apiBaseUrl}/grade/${gradeId}`);
    }

    public getClass(classId: number): Promise<Class> {
        return this.http.get(`${config.apiBaseUrl}/class/${classId}`);
    }

    public getMyClass(): Promise<Class[]> {
        return this.http.get(`${config.apiBaseUrl}/class/my`);
    }

    public delete(classId: number): Promise<null> {
        return this.http.delete(`${config.apiBaseUrl}/class/${classId}`);
    }

    public deleteGrade(gradeId: number): Promise<null> {
        return this.http.delete(`${config.apiBaseUrl}/grade/${gradeId}`);
    }
}
