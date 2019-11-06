export interface Comment {
    id: string;
    targetId: string;
    userId: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}