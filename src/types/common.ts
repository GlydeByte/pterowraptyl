export interface PaginationLinks {
    [key: string]: string;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: PaginationLinks;
}

export interface Meta {
    pagination: Pagination;
}

export interface PaginationOptions {
    page?: number;
    per_page?: number;
}