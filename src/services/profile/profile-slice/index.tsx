import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TProfileState, TProfileResponse, TUserUpdate, TUser } from "../types";
import securityRequest from "../../../api/security-request";

const InitialStateThunk = {
    isLoading: false, 
    isFailed: false,
    error: undefined
};

export const initialState: TProfileState = {
    user: {
        name: '', 
        email: ''
    },
    requests: {
        getUser: {...InitialStateThunk, isGetUserInfo: false},
        updateUser: InitialStateThunk,
    },
    isAuth: false
};

export const getUser = createAsyncThunk(
    "profile/getUser",
    async () => {
        const result = await securityRequest<TProfileResponse>('auth/user', 'GET');
        return result.user;
    }
);

export const updateUser = createAsyncThunk(
    "profile/updateUser",
    async (data: TUserUpdate) => {
        const result = await securityRequest<TProfileResponse>('auth/user', 'PATCH', data);
        return result.user;
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setData: (state, action: PayloadAction<TUser>) => {
            return {...state, user: action.payload, isAuth: true};
        },
        reset: (state) => {
            return {
                ...initialState, requests: {
                    ...initialState.requests, getUser: {
                        ...initialState.requests.getUser, isGetUserInfo: state.requests.getUser.isGetUserInfo
                    }
                }
            };
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getUser.fulfilled, (state, action) => ({
            ...state, user: action.payload, isAuth: true, requests: {
                ...state.requests, getUser: {...initialState.requests.getUser, isGetUserInfo: true}
            }
        }))
        .addCase(getUser.pending, state => ({
            ...state, requests: {
                ...state.requests, getUser: {
                    ...state.requests.getUser, isLoading: true
                }
            }
        }))
        .addCase(getUser.rejected, (state, action) => ({
            ...state, isAuth: false, requests: {
                ...state.requests, getUser: {
                    isLoading: false, isFailed: true, error: action.error.message, isGetUserInfo: true
                }
            }
        }))

        .addCase(updateUser.fulfilled, (state, action) => ({
            ...state, user: action.payload, requests: {
                ...state.requests, updateUser: initialState.requests.updateUser
            }
        }))
        .addCase(updateUser.pending, state => ({
            ...state, requests: {
                ...state.requests, updateUser: {
                    ...state.requests.updateUser, isLoading: true
                }
            }
        }))
        .addCase(updateUser.rejected, (state, action) => ({
            ...state, requests: {
                ...state.requests, updateUser: {
                    isLoading: false, isFailed: true, error: action.error.message
                }
            }
        }))
    }
});

export const { setData, reset } = profileSlice.actions;

export default profileSlice.reducer;