import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
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
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email',
        },
      ]}
    >
      <Input />

    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};

export default LoginPg;
