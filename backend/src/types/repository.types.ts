export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  find(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  //Partial es un utilitario de TS que permite mandar parte de los datos
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export type Query = Record<string, unknown>;
