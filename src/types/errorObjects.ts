export interface Error {
    data: {
        errors: Array<{
            code: string;
            status: string;
            detail: string;
        }>;
    };
    status: number;
}