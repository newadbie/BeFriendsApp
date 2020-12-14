import { RootState } from '../types';

export const getAuth = (state : RootState) => state.authState;

export const getDebtors = (state : RootState) => state.debtorState;