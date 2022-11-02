export type Hours = {
  id: number;
  accountId: number;
  minutesWorked: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: {
    id: number;
    username: string;
  };
}
