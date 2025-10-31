import { Modal } from 'antd';
import { memo } from 'react';
import type { IUserData } from '../list-user.hooks';
import styled from 'styled-components';

interface IModalDetailProps {
  isVisible: boolean;
  closeModal: () => void;
  data?: IUserData;
}

const TitleUser = styled.div`
  font-size: 24px;
  font-weight: 900;
  border-bottom: 1px solid #DBD7F4;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const TextBold = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const Text = styled.div`
  font-size: 16px;
`;

const ModalDetailUser = ({data, isVisible, closeModal}: IModalDetailProps) => {
  return (
    <Modal open={isVisible} onCancel={closeModal} closable={false} footer={false}>
      <img
        src={data?.image}
        alt="avatar"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <TitleUser>{data?.name}</TitleUser>
      <>
        <Flex>
          <TextBold>Username:</TextBold>
          <Text>{data?.username}</Text>
        </Flex>
        <Flex>
          <TextBold>Email:</TextBold>
          <Text>{data?.email}</Text>
        </Flex>
        <Flex>
          <TextBold>Phone:</TextBold>
          <Text>{data?.phone}</Text>
        </Flex>
        <Flex>
          <TextBold>City Address:</TextBold>
          <Text>{data?.address?.city}</Text>
        </Flex>
        <Flex>
          <TextBold>Website:</TextBold>
          <Text  style={{color: "orange"}}>{data?.website}</Text>
        </Flex>
        <Flex>
          <TextBold>Company Name:</TextBold>
          <Text>{data?.company.name}</Text>
        </Flex>
      </>
    </Modal>
  );
};

export default memo(ModalDetailUser);