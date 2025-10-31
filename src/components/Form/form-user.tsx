import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import hooks from '.././Pages/ListUsers/list-user.hooks';
import type { IUserData } from "../Pages/ListUsers/list-user.hooks";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: IUserData | null;
}

const UserFormModal = ({
  open,
  onClose,
  initialValues,
}: UserFormModalProps) => {
  const [form] = Form.useForm();
  const { onCreateUser, onUpdateUser } = hooks();

  const isEdit = !!initialValues;

  useEffect(() => {
    if (isEdit && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [isEdit, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newUser: IUserData = {
        id: isEdit ? initialValues!.id : crypto.randomUUID(),
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        website: values.website,
        address: {
          street: values.street || "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "0", lng: "0" },
        },
        company: {
          name: values.company || "",
          catchPhrase: "",
          bs: "",
        },
      };

      if (isEdit) {
        onUpdateUser(newUser);
      } else {
        onCreateUser(newUser);
      }

      onClose();
      form.resetFields();
    } catch (error) {
      console.error("Check form error", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEdit ? "Edit User" : "Add New User"}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Full name" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input placeholder="Phone number" />
        </Form.Item>

        <Form.Item name="website" label="Website">
          <Input placeholder="Website" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
