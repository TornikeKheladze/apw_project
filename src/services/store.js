import { configureStore } from "@reduxjs/toolkit";
import BalanceHistoryReducer from "reducers/BalanceHistoryReducer";
import CurrencyReducer from "reducers/CurrencyReducer";
import CustomerReducer from "reducers/CustomerReducer";
import ErrorListReducer from "reducers/ErrorListReducer";
import FilterReducer from "reducers/FilterReducer";
import LegalFormReducer from "reducers/LegalFormReducer";
import RoleReducer from "reducers/RoleReducer";
import RootReducers from "reducers/RootReducers";
import ServiceCategoryReducer from "reducers/ServiceCategoryReducer";
import ServiceProductionReducer from "reducers/ServiceProductionReducer";
import ServiceReducer from "reducers/ServiceReducer";
import TransactionsReducer from "reducers/TransactionsReducer";
import UserReducer from "reducers/UserReducer";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    role: RoleReducer,
    root: RootReducers,
    transaction: TransactionsReducer,
    service: ServiceReducer,
    customer: CustomerReducer,
    legalForm: LegalFormReducer,
    filter: FilterReducer,
    currency: CurrencyReducer,
    serviceCategory: ServiceCategoryReducer,
    serviceProduction: ServiceProductionReducer,
    errorList: ErrorListReducer,
    balanceHistory: BalanceHistoryReducer,
  },
});
