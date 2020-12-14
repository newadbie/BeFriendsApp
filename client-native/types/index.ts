import { debtorData } from "../components/DebtorItem";

export interface AuthState {
  userName: string;
  userEmail: string;
  isAuthenticated: boolean;
}

export enum filterTypes {
  all = "all",
  paid = "paid",
  unPaid = "unPaid"
}

export interface DebtorState {
  debtors: Array<debtorData>;
  isLoading: boolean,
  filterType: filterTypes
}

export interface RootState {
  authState: AuthState;
  debtorState: DebtorState;
}
