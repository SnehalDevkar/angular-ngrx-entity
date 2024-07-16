import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CoursesActions } from "./action-types";
import { selectAllCoursesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading: boolean = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectAllCoursesLoaded),
      tap((allowCoursesLoadedFlag) => {
        if (!this.loading && !allowCoursesLoadedFlag) {
            this.loading = true;
          this.store.dispatch(CoursesActions.loadAllCourses());
        }
      }),
      filter(allowCoursesLoadedFlag => allowCoursesLoadedFlag), // complete the observable when the condition is true
      first(),
      finalize(() => this.loading = false)
    );
  }
}
