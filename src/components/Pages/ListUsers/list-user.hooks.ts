import axios from "axios";
import { useCallback, useContext, useMemo, useState } from "react";
import { UserContext } from "../../../context/user-context";
import columns from "./columns";

export interface IUserData {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  image?: string;
}

export default () => {
  const { state, dispatch } = useContext(UserContext);
  const { users, isLoading } = state;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserData>();

  const init = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [usersRes, imagesRes] = await Promise.all([
        axios.get<IUserData[]>("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://picsum.photos/v2/list?page=1&limit=30"),
      ]);

      const usersData = usersRes.data;
      const imagesData = imagesRes.data;

      const combined = usersData.map((user, index) => ({
        ...user,
        image: imagesData[index % imagesData.length]?.download_url,
      }));

      dispatch({ type: "SET_USERS", payload: combined });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  const onCreateUser = useCallback(
    async (newUser: Omit<IUserData, "id">) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        setSelectedUser(undefined);
        const resp = await axios.post<IUserData>(
          "https://jsonplaceholder.typicode.com/users",
          newUser
        );
        dispatch({ type: "ADD_USER", payload: resp.data });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch]
  );

  const onUpdateUser = useCallback(
    async (user: IUserData) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        setIsVisible(true);
        setSelectedUser(user);
        const resp = await axios.put<IUserData>(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          user
        );
        dispatch({ type: "UPDATE_USER", payload: resp.data });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch]
  );

  const onDeleteUser = useCallback(
    async (id: string) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        dispatch({ type: "DELETE_USER", payload: id });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch]
  );

  const openDetailUser = useCallback(
    (user: IUserData) => {
      dispatch({ type: "SET_SELECTED_USER", payload: user });
    },
    [dispatch]
  );

  const closeDetailUser = useCallback(() => {
    dispatch({ type: "SET_SELECTED_USER", payload: undefined });
  }, [dispatch]);

  const openModalForm = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModalForm = useCallback(() => {
    setIsVisible(false);
  }, []);

  const propsTableUsers = useMemo(
    () => ({
      dataSource: users,
      columns: columns({ openDetailUser, onUpdateUser, onDeleteUser }),
      loading: isLoading,
      rowKey: "id",
    }),
    [users, isLoading, onDeleteUser, onUpdateUser, openDetailUser]
  );

  return {
    init,
    users,
    state,
    onCreateUser,
    onUpdateUser,
    onDeleteUser,
    openDetailUser,
    closeDetailUser,
    propsTableUsers,
    isVisible,
    selectedUser,
    openModalForm,
    closeModalForm,
  };
};
