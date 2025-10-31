/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, type Dispatch } from "react";
import type { IUserData } from "../components/Pages/ListUsers/list-user.hooks";

interface UserState {
  users: IUserData[];
  selectedUser?: IUserData;
  isLoading: boolean;
  error?: string | null;
}

type Action =
  | { type: "SET_USERS"; payload: IUserData[] }
  | { type: "ADD_USER"; payload: IUserData }
  | { type: "UPDATE_USER"; payload: IUserData }
  | { type: "DELETE_USER"; payload: string }
  | { type: "SET_SELECTED_USER"; payload: IUserData | undefined }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: UserState = {
  users: [],
  selectedUser: undefined,
  isLoading: false,
  error: null,
};

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload, error: null };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload], error: null };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
        error: null,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
        error: null,
      };
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

interface UserContextType {
  state: UserState;
  dispatch: Dispatch<Action>;
}

export const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
