import { Form, Input, Button, notification } from 'antd';
import { LockIcon, MailIcon } from 'lucide-react';

import { useNavigate, Link  } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setIsLoading } from '../authSlice';
import { useLoginMutation } from '../authApiSlice';


export const SignInForm=() => {
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const isLoading = useSelector((state) => state.auth.isLoading)

    const onFinish = (values) => {
        const areValidFields= validateFieldsRequired(values);
        if(areValidFields){
            // console.log("login");
            handleLogin(values);
        }
    };

    const handleLogin = async ({email,password}) => {
        dispatch(setIsLoading(true))
        try {
            const response = await login({email,password}).unwrap();
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
                onOpenNotification('Error', 'Ingreso fallido');
            }
        }finally{
            dispatch(setIsLoading(false));
        }
    }

    const validateFieldsRequired = ({email,password}) =>{
        // console.log('validateFieldsRequired');
        if(!email.trim() || !password.trim()){
            return false;
        }
        return true;
    }

    const onOpenNotification = (title, description) => {
        api.open({
            message: title ||'Notification Title',
            description: description ||
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            className: 'bg-red-200 text-red-600 dark:bg-black border border-red-300',
        });
    };

    return (
        <Form
        name="signin"
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
        >
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
            disabled={isLoading}
            />
        </Form.Item>

        <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Porfavor ingresa tu contraseña!' }]}
        >
            <Input.Password
            prefix={<LockIcon className="h-4 w-4 text-gray-400" />}
            placeholder="Ingresa tu contraseña"
            size="large"
            disabled={isLoading}
            />
        </Form.Item>

        <Form.Item className="mt-10">
            <Button type="primary" htmlType="submit" className="w-full h-10" size="large" loading={isLoading}>
            Ingresar
            </Button>
        </Form.Item>

        <p className="text-center text-sm text-content">
            Aún no estas registrado?{' '}
            <Link to="register" className="text-blue-600 hover:text-blue-500">
                Registrate ahora
            </Link>
        </p>
        {contextHolder}
        </Form>
    );
}