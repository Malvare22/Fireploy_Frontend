export type FilterLabels<T> = {
  [K in keyof T]: {
    key: K;
    text: string,
    labels: { value: any; text: string | undefined }[]; // Permitir undefined en text
  };
}[keyof T];