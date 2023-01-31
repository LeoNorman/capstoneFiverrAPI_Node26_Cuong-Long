import { UserRole } from '../user.entity';

export interface Paging {
  page: number;
  pageSize: number;
}

export interface Filter {
  role: UserRole;
  name: string;
}

export type FindAllQuery = Paging & Filter;
