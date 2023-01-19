export interface Paging {
    page: number;
    pageSize: number;
}

export interface Filter {
    role: string;
}

export type FindAllQuery = Paging & Filter;

