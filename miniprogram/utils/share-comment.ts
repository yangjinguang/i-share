export interface ShareComment {
    id: number;
    shareId: number;
    userId: number;
    userName: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
