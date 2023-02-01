import { UserRole } from './user.dto';

export interface Paging {
  page: number;
  pageSize: number;
}

export interface Filter {
  role: UserRole;
  name: string;
}

export type FindAllQuery = Paging & Filter;
