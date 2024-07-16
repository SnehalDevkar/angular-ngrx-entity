import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./reducers";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
)