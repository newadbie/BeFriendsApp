export type DebtorData = {
  _id: string;
  name: string;
  phoneNumber: number;
  takenCredits: number;
  totalCredit: number;
};

export type CreditData = { 
  creditName: string,
  creditValue: number
}

export interface AuthState {
  userName: string;
  userEmail: string;
  isAuthenticated: boolean;
}

export enum FilterTypes {
  all = "all",
  paid = "paid",
  unPaid = "unPaid",
}

export interface DebtorState {
  debtors: Array<DebtorData>;
  isLoading: boolean;
  filterType: FilterTypes;
  selectedDebtor: {
    data: DebtorData,
    credits: Array<CreditData>  
  } | null;
}

export interface RootState {
  authState: AuthState;
  debtorState: DebtorState;
}
