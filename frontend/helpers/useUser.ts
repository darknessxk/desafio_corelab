"use client"
import {useEffect, useMemo, useReducer} from "react";
import getStorage from "@/helpers/getStorage";
import {useRouter} from "next/navigation";
import IUser from "@/interfaces/IUser";
import {IAuthOkResponse} from "@/interfaces/IAuthOkResponse";

interface UserState {
    user?: IUser;
    token: string | null;
}

enum UserActionType {
    updateUser = "updateUser",
    clearToken = "clearToken",
}

type UserActionClearToken = {
    type: UserActionType.clearToken;
}

type UserActionUpdateUser = {
    type: UserActionType.updateUser;
    payload: IAuthOkResponse;
    storageKey: "user";
}

type EventData = {
    key: string | null;
    newValue: string | null;
    oldValue: string | null;
}


type UserActions = UserActionClearToken | UserActionUpdateUser;

function dispatchStorageEvent(callback: () => void, event: EventData) {
    callback()
    const instance = new StorageEvent('storage', {
        key: event.key,
        newValue: event.newValue,
        oldValue: event.oldValue,
    });
    document.dispatchEvent(instance);
}

function reducer(state: UserState, action: UserActions): UserState {
    const { type } = action;
    switch (type) {
        case UserActionType.updateUser:
        {
            const { payload } = action as UserActionUpdateUser;

            return {
                ...state,
                user: payload.user,
                token: payload.token,
            };
        }
        case UserActionType.clearToken:
        {
            return {
                ...state,
                token: null,
                user: undefined,
            };
        }
        default:
            return state;
    }
}

export function useUser() {
    const storage = getStorage();

    const [state, dispatch] = useReducer(reducer, {
        token: "",
        isAuthenticated: false
    }, () => {

        const payload = storage.get<IAuthOkResponse>('user');
        if (payload) {
            return {
                user: payload.user,
                token: payload.token,
            }
        }

        return {
            token: "",
        };
    });

    useEffect(() => {
        document.addEventListener('storage', (event: any) => {
            if (event.key === 'user') {
                const payload = storage.get<IAuthOkResponse>('user');
                if (payload) {
                    dispatch({ type: UserActionType.updateUser, payload, storageKey: 'user' });
                } else {
                    dispatch({ type: UserActionType.clearToken });
                }
            }
        })
    })

    const router = useRouter();
    const isAuthenticated = useMemo(() => 
        state.token !== null && state.token.length && state.user, 
    [state.token, state.user]);

    return {
        state,
        isAuthenticated,
        clearToken: () => {
            dispatchStorageEvent(
                () => storage.remove('user'),
                { key: 'user', newValue: null, oldValue: null }
            );
            dispatch({ type: UserActionType.clearToken });
            router.push('/');
        },
        setData: (user: IAuthOkResponse) => {
            dispatchStorageEvent(
                () => storage.set('user', user),
                { key: 'user', newValue: JSON.stringify(user), oldValue: null }
            );
            dispatch({ type: UserActionType.updateUser, payload: user, storageKey: 'user' });
        }
    }
}
