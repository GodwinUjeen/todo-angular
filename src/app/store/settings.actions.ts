import { createAction, props } from '@ngrx/store';

export interface Email {
    email: string,
}

export const login = createAction(
    '[Login Page] Login',
    props<Email>()
);
