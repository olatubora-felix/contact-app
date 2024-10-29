export interface ContactAPIResponse {
  data: Data[];
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  surname: string;
  phone: string;
  email: string;
  firstName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface SingleContactAPIResponse {
  data: Data;
  meta: Meta;
}
