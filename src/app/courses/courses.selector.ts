import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, coursesFeatureKey, CoursesState } from "./courses.reducers";
import { state } from "@angular/animations";

export const selecCourseState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourse = createSelector(
    selecCourseState,
    adapter.getSelectors().selectAll
)

export const selectBeginnerCourses = createSelector(
    selectAllCourse,
    courses => courses.filter(course => course.category === 'BEGINNER')
)

export const selectAdvancedCourses = createSelector(
    selectAllCourse,
    courses => courses.filter(course => course.category === 'ADVANCED')
)

export const selectPromoTotal = createSelector(
    selectAllCourse,
    courses => courses.filter(course => course.promo).length
)

export const selectAllCoursesLoaded = createSelector(
    selecCourseState,
    state => state.allorCoursesLoaded
)