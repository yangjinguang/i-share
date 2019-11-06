import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {Student} from '../utils/types/student';

export class StudentApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public get(studentId: number): Promise<Student> {
        return this.http.get(`${config.apiBaseUrl}/student/${studentId}`);
    }

    public getMy(): Promise<Student[]> {
        return this.http.get(`${config.apiBaseUrl}/student/my`);
    }

    public getByClass(classId: number): Promise<Student[]> {
        return this.http.get(`${config.apiBaseUrl}/student/by-class-id/${classId}`);
    }

    public create(newStudent: Student): Promise<Student> {
        return this.http.post(`${config.apiBaseUrl}/student`, newStudent);
    }

    public update(studentId: number, newStudent: Student): Promise<Student> {
        return this.http.put(`${config.apiBaseUrl}/student/${studentId}`, newStudent);
    }

    public delete(studentId: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/student/${studentId}`);
    }
}
