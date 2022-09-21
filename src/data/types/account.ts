export type AccountRole = 'user' | 'employee' | 'manager'

export type Account = {
  id: number;
  username: string;
  role: AccountRole;
  balance: number;
  createdAt: string;
}
