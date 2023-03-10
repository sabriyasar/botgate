import React from 'react';
import { Menu, Dropdown, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { actions, dispatch } from 'redux/eis';

import Icon from 'components/icon';

import 'assets/scss/layouts/userMenu.scss';
const {
  auth: { logout },
} = actions;

const UserMenu = () => {
  const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item>
        <Icon size="21px" icon="user" />
        <div className="menuText">{t('user_profile')}</div>
      </Menu.Item>
      <Menu.Item>
        <Icon size="21px" icon="lock" />
        <div className="menuText">{t('change_password')}</div>
      </Menu.Item>
      <Menu.Item>
        <Icon size="21px" icon="notification" />
        <div className="menuText">{t('notification_settings')}</div>
      </Menu.Item>
      <Menu.Item>
        <Icon size="21px" icon="timer" />
        <div className="menuText">{t('last_cases')}</div>
      </Menu.Item>
      <Menu.Item>
        <Icon size="21px" icon="help" />
        <div className="menuText">{t('help')}</div>
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(logout())}>
        <Icon size="21px" icon="off" />
        <div className="menuText">{t('logout')}</div>
      </Menu.Item>
      <Menu.Item className="userMenuActions" onClick={e => e.preventDefault()}>
        <div className="themeSwitcher">
          <Switch size="small" defaultChecked disabled /> Gündüz
        </div>
        <div className="langSwitcher">
          TR | EN
        </div>
      </Menu.Item>
    </Menu>
  );

  return <div className="userMenu" id="userMenu">
    <div className="userMenuDropDown">
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow={true}
        getPopupContainer={() => document.getElementById('userMenu')}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Icon size="40px" color="#bababa" icon="user" className="userMenuIcon" />
        </a>
      </Dropdown>
    </div>
  </div>;
};

export default UserMenu;
