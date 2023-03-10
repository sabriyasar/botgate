import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Input, Button, Icon } from 'components';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { selectors, actions, dispatch } from 'redux/eis';
import { GetAuthInfoByKey } from 'utils/authHelper';

import './index.scss';

const {
  auth: { login },
} = actions;

const {
  auth: { selectAuthPending, selectAuthIsLogin },
} = selectors;

const Login = () => {
  const { t } = useTranslation();
  const pending = useSelector(selectAuthPending);
  const isLogin = useSelector(selectAuthIsLogin);
  const token = GetAuthInfoByKey('token');

  const onFinish = ({ email, password }) => {
    dispatch(login(email, password));
  };

  if (!pending && isLogin && token) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className="loginWrapper">
      <div className="bakanlikLogoWrapper">
        <div className="bakanlikLogo">
          <Icon icon="bakanlik" size="200px" />
        </div>
      </div>
      <div className="loginLogo">
        <div className="logoItem">
          <Icon icon="egm-logo" size="110px" />
        </div>
        <div className="logoItem">
          <Icon icon="jandarma-icon" size="110px" />
        </div>
      </div>
      <Form className="formWrapper" onFinish={onFinish} autoComplete="off">
        <Input
          placeholder={t('email')}
          name="email"
          suffix={<Icon icon="user-outline" size="18px" />}
          rules={[
            {
              type: 'email',
              message: t('please_enter_valid_email'),
            },
            {
              required: true,
              message: t('please_enter_email'),
            },
          ]}
        />
        <Input
          placeholder={t('password')}
          name="password"
          type="password"
          rules={[
            {
              required: true,
              message: t('please_enter_password'),
            },
          ]}
        />
        <Button
          htmlType="submit"
          text={t('login')}
          loading={pending}
          className="btn-primary"
        />
      </Form>
    </div>
  );
};

export default Login;
