export interface IOrderDataResponse {
  status: number;
  message: string;
  data: { userId: string } | null;
}
