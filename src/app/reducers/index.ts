import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer, // router used for time travelling debugger
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action: ", action);
    const nextState = reducer(state, action);
    console.log("state after: ", nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
