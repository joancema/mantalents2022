import { Form, Input, Button, Checkbox } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../img/MANTALENTS.png';
import { Link } from 'react-router-dom';

export const LoginPage = ()=>{
  const { login } = useContext( AuthContext );
    const onFinish = async (values: any) =>  {
      const ok = await login( values.username, values.password );
      console.log(ok)
    };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      
    return (
      <>
      <header className="header contenedor">
      <div className="header__logo">
      <Link to="/auth/inicio">
          <img src={logo} alt="logo delivery app"/>
          </Link>  
      </div>

      
      </header>





        <Form
      name="basic"
      
      labelCol={{ span:6 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
    )

}