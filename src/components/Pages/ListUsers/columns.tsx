import styled from "styled-components";
import type { IUserData } from "./list-user.hooks";

interface IColumnProps {
  openDetailUser: (e: IUserData) => void;
  onUpdateUser: (e: IUserData) => void;
  onDeleteUser: (e: string) => void;
}

const TitleName = styled.div`
  color: #e86d18;
  font-weight: 700;
  cursor: pointer;
  margin-left: 15px;
`;

const ButtonAction = styled.div`
  color: #e86d18;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 4px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const columns = ({
  openDetailUser,
  onUpdateUser,
  onDeleteUser,
}: IColumnProps) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string, data: IUserData) => (
      <Flex>
        <img
          src={data.image}
          alt="avatar"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <TitleName onClick={() => openDetailUser(data)}>{name}</TitleName>
      </Flex>
    ),
  },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Website", dataIndex: "website", key: "website" },
  {
    key: "actions",
    render: (data: IUserData) => (
      <div>
        <ButtonAction onClick={() => onUpdateUser(data)}>Edit</ButtonAction>
        <ButtonAction onClick={() => onDeleteUser(data.id)}>Delete</ButtonAction>
      </div>
    ),
  },
];

export default columns;
