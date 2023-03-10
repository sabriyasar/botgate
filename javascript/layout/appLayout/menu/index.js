import React from 'react';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';

import 'assets/scss/layouts/body.scss';

import { useTranslation } from 'react-i18next';
import MenuData from './menuData';

const { SubMenu } = AntMenu;

const Menu = () => {
  const { t } = useTranslation();

  const renderChildren = (menuItem) => {
    return <AntMenu.Item
      className="menuItem"
      key={menuItem.id}
    >
      <Link to={menuItem.path}>{t(menuItem.title)}</Link>
    </AntMenu.Item>;
  };

  return (
    <AntMenu
      className="menu"
      mode="vertical"
      getPopupContainer={() => document.getElementById('menuContainer')}
      selectable={false}
    >
      <AntMenu.Item className="eisLogo" icon={<Icon icon="eis-logo" size="40px" color="white" />} />
      {
        MenuData.map(item => {
          const menuItemTitle = t(item.title);
          return item.children ? <SubMenu
            key={`${item.id}_sub`}
            className="menuItem"
            title={menuItemTitle}
            icon={<Icon icon={item.icon} size="30px" color="white" />}
            getPopupContainer={() => document.getElementById('menuContainer')}
          >
            {item.children.map(childItem => renderChildren(childItem))}
          </SubMenu> : <AntMenu.Item
            className="menuItem"
            key={`${item.id}_menu_item`}
            title={menuItemTitle}
          >
            <Link to={item.path}><Icon icon={item.icon} size="30px" color="white" /></Link>
          </AntMenu.Item>;
        })
      }
    </AntMenu>
  );
};

export default Menu;
