export class ServiceResult<T> {
  success: boolean;
  code: number;
  message: string;
  value: T;
}
export class ServiceListResult<T> extends ServiceResult<T> {
  total: number;
}
export class ServiceHttpStatusResult<T> extends ServiceListResult<T> {
  status: number;
  statusText: string;

  public constructor(init?: Partial<ServiceHttpStatusResult<T>>) {
    super();
    Object.assign(this, init);
  }
}
