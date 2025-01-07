import { Form, Input, Button, Select, notification } from 'antd';
import { LockIcon, MailIcon, UserIcon, UsersIcon, UserCircleIcon } from 'lucide-react';
import { USER_TYPE_OPTIONS } from '../helpers/constants';
import { Link, useNavigate } from 'react-router';
import { useRegisterMutation } from '../authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRegisterLoading,setCredentials } from '../authSlice';

export function SignUpForm() {
    const navigate = useNavigate();

    const [register] = useRegisterMutation();
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const isRegisterLoading = useSelector((state) => state.auth.isRegisterLoading);

    const onFinish = (values) => {
        const areValidFields= validateFieldsRequired(values);
        if(areValidFields){
            console.log("register");
            handleRegister(values);
        }
    };

    const handleRegister = async ({email,password,userName,name,userType,paternalSurname='',maternalSurname=''}) => {
        dispatch(setIsRegisterLoading(true))
        try {
            const response = await register({email,password,userName,name,userType,paternalSurname,maternalSurname}).unwrap();
            dispatch(setCredentials({token : response.token, user:{email}}));
            navigate('/users/dashboard_1');
        } catch (error) {
            console.log('error', error);
            if(!error?.status){
                // console.log('No server response');
                onOpenNotification('Error', 'El servidor no responde');
            }else if (error.status===400){
                // console.log('Invalid credentials');
                onOpenNotification('Error', 'Credenciales incorrectas');
            }else{
                // console.log('Login failed');
                onOpenNotification('Error', 'Registro fallido');
            }
        }finally{
            dispatch(setIsRegisterLoading(false));
        }
    }

    const validateFieldsRequired = ({email,password,userName,name,userType}) =>{
        console.log('validateFieldsRequired');
        if(!email.trim() || !password.trim() || !userName.trim() || !name.trim() || !userType ){
            return false;
        }
        return true;
    }

    const onOpenNotification = (title, description) => {
        api.open({
            message: title ||'Notification Title',
            description: description ||
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            className: 'bg-red-200 text-red-600 border border-red-300',
        });
    };


return (
    <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
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
                disabled={isRegisterLoading}
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
                disabled={isRegisterLoading}
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
                disabled={isRegisterLoading}
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
                disabled={isRegisterLoading}
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
                disabled={isRegisterLoading}
            />
            </Form.Item>

            <Form.Item
                label="Contraseña"
                name="password"
                rules={[
                { required: true, message: 'Porfavor ingresa tu contraseña!' },
                { min: 8, message: 'Debe contar con un minimo de 8 caracteres!' }
                ]}
            >
                <Input.Password
                prefix={<LockIcon className="h-4 w-4 text-gray-400" />}
                placeholder="Ingresa tu contraseña"
                size="large"
                disabled={isRegisterLoading}
                />
            </Form.Item>


        </div>

        <Form.Item
        label="Tipo de usuario"
        name="userType"
        rules={[{ required: true, message: 'Porfavor selecciona el tipo de usuario!' }]}
        >
        <Select
            size="large"
            placeholder="Selecciona el tipo de usuario"
            options={USER_TYPE_OPTIONS}
            disabled={isRegisterLoading}
        />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-10" size="large" loading={isRegisterLoading}>
            Registrarse
            </Button>
        </Form.Item>

        <p className="text-center text-sm text-gray-600">
            Ya tienes una cuenta?{' '}
            <Link to="/" className="text-blue-600 hover:text-blue-500">
                Ingresar
            </Link>
        </p>

        {contextHolder}
    </Form>
    );
}