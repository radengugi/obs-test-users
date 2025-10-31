import { Button, Table } from "antd";
import { memo, useEffect } from "react";
import styled from "styled-components";
import ModalDetailUser from "./components/modal-detail-user";
import hooks from "./list-user.hooks";
import UserFormModal from "../../Form/form-user";

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

const BtnCreate = styled(Button)`
  background: #e86d18;
  border: none;
  color: #fff;
  font-weight: 600;
  margin-bottom: 16px;
  &:hover {
    background: #e86d18 !important;
    color: #fff !important;
  }
`;

const ListUser = () => {
  const {
    init,
    users,
    state,
    closeDetailUser,
    propsTableUsers,
    isVisible,
    selectedUser,
    openModalForm,
    closeModalForm,
  } = hooks();
  
  useEffect(() => {
    if (users.length === 0) {
      init();
    }
  }, [init, users.length]);

  return (
    <div>
      <Title>List User</Title>
      <BtnCreate onClick={openModalForm}>Create User</BtnCreate>
      <Table {...propsTableUsers} />

      <ModalDetailUser
        data={state.selectedUser}
        isVisible={!!state.selectedUser}
        closeModal={closeDetailUser}
      />
      <UserFormModal
        open={isVisible}
        onClose={closeModalForm}
        initialValues={selectedUser}
      />
    </div>
  );
};

export default memo(ListUser);
