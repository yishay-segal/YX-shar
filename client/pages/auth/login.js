import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../../styles/login.module.scss';
import { loginFunc } from '../../Services/authFunc';

const login = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    try {
      loginFunc(values.email, values.password)
        .then(res => {
          console.log(res);
          alert(`Nice to see you again ${res.data.user.name}`);
          form.resetFields();
        })
        .catch(err => {
          alert(err.response.data.message);
          console.log(err.response.data.message);
        });
    } catch (error) {
      alert('Server error try again');
    }
    // console.log('Received values of form', values);
  };

  return (
    <div className={styles.box}>
      <div>
        <h2>Login Back To Our Website</h2>
        <Form
          name="login"
          form={form}
          className={styles.login_form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default login;
