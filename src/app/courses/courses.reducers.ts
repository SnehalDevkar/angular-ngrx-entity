import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { compareCourses, Course } from "./model/course";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "./action-types";

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
    allorCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState(
    {
        allorCoursesLoaded: false
    }
);

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CoursesActions.allCoursesLoaded,
        (state, action) => adapter.addMany(action.courses, {...state, allorCoursesLoaded: true})
    ),
    on(CoursesActions.courseUpdated,
        (state, action) => adapter.updateOne(action.update, state)
    )
)