export interface HeadCell<T> {
    id: keyof T;
    label: string;
    sorteable: boolean
  }