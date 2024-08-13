import {Flex, Modal, Form, notification} from 'antd';
import {KeyOutlined, UserOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import useRegister from "@/api/useRegister";
import {useCallback} from "react";
import {IRegisterRequest} from "@/interfaces/IRegisterRequest";

type RegisterModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

type RegisterFormType = IRegisterRequest["body"]

export default function RegisterModal({ open, setOpen }: RegisterModalProps) {
    const [form] = Form.useForm<RegisterFormType>();
    const {
        mutate: register,
        status
    } = useRegister({
        successCallback: () => {
            form.resetFields();
            setOpen(false);
            notification.success({
                message: 'Registration successful',
                description: 'You have been registered'
            });
        },
        errorCallback: (error) => {
            notification.error({
                message: 'Registration failed',
                description: error.message
            });
        }
    });

    const onFinish = useCallback(async (values: RegisterFormType) => register(values), [register])

    return <Modal
        open={open}
        title="Register"
        okText="Register"
        cancelText="Cancel"
        okButtonProps={{
            loading: status === 'pending'
        }}
        cancelButtonProps={{
            disabled: status === 'pending'
        }}
        onCancel={() => {
            form.resetFields()
            setOpen(false);
        }}
        onOk={() => {
            form.submit();
        }}
    >
        <Form form={form} preserve={false} onFinish={onFinish}>
            <Flex vertical gap={6}>
                <Form.Item<RegisterFormType>
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Name" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item<RegisterFormType>
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email" prefix={<UserOutlined />} type="email" />
                </Form.Item>

                <Form.Item<RegisterFormType>
                    name="password"
                    rules={[ { required: true, message: 'Please input your password!' }, ]}
                >
                    <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
                </Form.Item>

                <Form.Item<RegisterFormType>
                    name="password_confirmation"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" prefix={<KeyOutlined />} />
                </Form.Item>
            </Flex>
        </Form>
    </Modal>
}