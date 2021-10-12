import { Action, createReducer, on } from '@ngrx/store';
import * as Settings from './settings.actions'


export interface State {
    email: string
}

export const initialState: State = {
    email: ''
};

const settingsReducer = createReducer(initialState, on(Settings.login, (state, { email }) => ({ email })))

export function reducer(state: State | undefined, action: Action) {
    return settingsReducer(state, action);
}