import { Form, Input, Button } from 'antd';
import styles from '../../styles/signup.module.scss';
import { signupFunc } from '../../Services/authFunc';

const layout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
  labelAlign: 'left',
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const signup = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    try {
      signupFunc(values.username, values.email, values.password)
        .then(res => {
          // console.log(res);
          alert(`Welcome to out website ${res.data.user.name}`);
          form.resetFields();
        })
        .catch(err => {
          alert(err.response.data.message);
          console.log(err.response.data.message);
        });
      console.log('success:', values);
    } catch (error) {
      // console.log(error);
      alert('Server error try again');
    }
  };

  return (
    <div className={styles.box}>
      <div>
        <h2>Register To Our Website</h2>
        <Form
          form={form}
          className={styles.form}
          size="large"
          {...layout}
          name="register"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            label="Username"
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password-confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default signup;
