import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios'


let urlApi = 'http://localhost:3000'

const onFinish =async (values) => {
  console.log('Success:', values);
  await axios.post(`${urlApi}/users`,values)
  console.log('user added');
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginPg = () => {
  const [user,setUsers] = useState([])
  let allUsers=async()=>{
    let values = await axios.get(`${urlApi}/users`)
    console.log(values.data);
    setUsers(values.data)
  }
  useEffect(()=>{
  allUsers()
  },[])
  return (
    <>
    <h3>Login Form</h3>
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="">Register now!</a>
      </Form.Item>
    </Form>
    </>
  );
};

export default LoginPg;
