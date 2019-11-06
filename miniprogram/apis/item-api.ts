import {config} from '../utils/config';
import {HttpClient} from '../utils/http-client';
import {ItemTag} from '../utils/types/item-tag';
import {Item} from '../utils/types/item';
import {ItemQueryResponse} from '../utils/types/item-query-response';
import {ItemLendOrder} from '../utils/types/item-lend-order';

export class ItemApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public getTags(): Promise<ItemTag[]> {
        return this.http.get(`${config.apiBaseUrl}/item/tag`);
    }

    public getTag(tagId: number): Promise<ItemTag> {
        return this.http.get(`${config.apiBaseUrl}/item/tag/${tagId}`);
    }

    public createTag(newTag: ItemTag): Promise<ItemTag> {
        return this.http.post(`${config.apiBaseUrl}/item/tag`, newTag);
    }

    public updateTag(tagId: number, newTag: ItemTag): Promise<ItemTag> {
        return this.http.put(`${config.apiBaseUrl}/item/tag/${tagId}`, newTag);
    }

    public deleteTag(tagId: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/item/tag/${tagId}`);
    }

    public create(newItem: Item): Promise<Item> {
        return this.http.post(`${config.apiBaseUrl}/item`, newItem);
    }

    public search(s: string): Promise<Item[]> {
        return this.http.get(`${config.apiBaseUrl}/item/search`, {s: s});
    }


    public query(page: number, size: number, tagId?: number): Promise<ItemQueryResponse> {
        return this.http.get(`${config.apiBaseUrl}/item`, {
            page: page,
            size: size,
            tag: tagId || null
        });
    }


    public queryMgr(page: number, size: number): Promise<ItemQueryResponse> {
        return this.http.get(`${config.apiBaseUrl}/item/mgr`, {
            page: page,
            size: size
        });
    }

    public getOne(id: number): Promise<Item> {
        return this.http.get(`${config.apiBaseUrl}/item/${id}`);
    }

    public getDetail(id: number): Promise<Item> {
        return this.http.get(`${config.apiBaseUrl}/items/detail/${id}`);
    }

    public delete(id: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/item/${id}`);
    }

    public update(id: number, newItem: Item): Promise<Item> {
        return this.http.put(`${config.apiBaseUrl}/item/${id}`, newItem);
    }

    public loan(id: number, newLoanedRecord: ItemLendOrder): Promise<Item> {
        return this.http.put(`${config.apiBaseUrl}/items/loan/${id}`, newLoanedRecord);
    }

    public loanReturn(recordId: string): Promise<ItemLendOrder> {
        return this.http.put(`${config.apiBaseUrl}/items/return/${recordId}`);
    }

    public getLoanedRecords(statusList: number[]): Promise<ItemLendOrder[]> {
        return this.http.get(`${config.apiBaseUrl}/items/loaned`, {status: statusList.join(',')});
    }

    public cancelItemLoan(id: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/items/loanRecord/cancel/${id}`);
    }

    public getLoanedRecord(recordId: string): Promise<ItemLendOrder> {
        return this.http.get(`${config.apiBaseUrl}/items/loanRecord/${recordId}`);
    }

    public loanedRecordStatus(recordId: string, status: number): Promise<ItemLendOrder> {
        return this.http.put(`${config.apiBaseUrl}/items/loanRecord/status/${recordId}/${status}`);
    }
}
