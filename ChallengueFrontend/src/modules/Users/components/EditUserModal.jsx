import { Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MailIcon, UserCircleIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useUpdateUserMutation } from '../usersApiSlice';
import { setUserById } from '../usersSlice';
import { useDispatch } from 'react-redux';

export const EditUserModal = ({userInfo,userId, open,setClose}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [updateUser] =useUpdateUserMutation()
    const dispatch = useDispatch();


    useEffect(() => {
        if (userInfo) {
            form.setFieldsValue(userInfo);
        } else {
            form.resetFields();
        }
    }, [userInfo, form]);


    const onEditUser = async() => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        try {
            const newValues= await form.validateFields();
            const userDataUpdated = await updateUser({id:userId,...newValues}).unwrap();
            // console.log('response', userDataUpdated);
            dispatch(setUserById(userDataUpdated));
            setClose();
        } catch (error) {
            console.log('Validación fallida:', error);
            setConfirmLoading(false);
        }finally {
            setConfirmLoading(false);
        }
    };

    const onHandleCancel = () => {
        console.log('Clicked cancel button');
        setClose();
    };
    return (
        <Modal
            title="Editar Usuario"
            open={open}
            onOk={onEditUser}
            confirmLoading={confirmLoading}
            onCancel={onHandleCancel}
            okText="Guardar"
            cancelText="Cancelar"
            forceRender
        >
            <Form
                name="signup"
                layout="vertical"
                className="w-full"
                form={form}
                initialValues={userInfo}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                    label="Nombre de usuario"
                    name="userName"
                    rules={[{ required: true, message: 'Porfavor ingresa nombre de usuario!' }]}
                    >
                    <Input
                        prefix={<UserIcon className="h-4 w-4 text-gray-400" />}
                        placeholder="Ingresa nombre de usuario"
                        size="large"
                    />
                    </Form.Item>

                    <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Porfavor ingresa tu nombre!' }]}
                    >
                    <Input
                        prefix={<UserCircleIcon className="h-4 w-4 text-gray-400" />}
                        placeholder="Ingresa tu nombre"
                        size="large"
                    />
                    </Form.Item>

                    <Form.Item
                    label="Apellido paterno"
                    name="paternalSurname"
                    >
                    <Input
                        prefix={<UsersIcon className="h-4 w-4 text-gray-400" />}
                        placeholder="Ingresa tu apellido paterno"
                        size="large"
                    />
                    </Form.Item>

                    <Form.Item
                    label="Apellido materno"
                    name="maternalSurname"
                    >
                    <Input
                        prefix={<UsersIcon className="h-4 w-4 text-gray-400" />}
                        placeholder="Ingresa tu apellido materno"
                        size="large"
                    />
                    </Form.Item>

                    <Form.Item
                    label="Correo"
                    name="email"
                    rules={[
                        { required: true, message: 'Porfavor ingresa tu correo!' },
                        { type: 'email', message: 'Porfavor ingresa un correo válido!' }
                    ]}
                    >
                    <Input
                        prefix={<MailIcon className="h-4 w-4 text-gray-400" />}
                        placeholder="Ingresa tu correo"
                        size="large"
                    />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

EditUserModal.propTypes = {
    userInfo: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null])
    ]),
    userId: PropTypes.number,
    open: PropTypes.bool,
    setClose: PropTypes.func
}