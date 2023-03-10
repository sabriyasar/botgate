import React from 'react';
import Icon from 'components/icon';
import { useTranslation } from 'react-i18next';
import 'assets/scss/layouts/header.scss';
import UserMenu from './userMenu';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="headerLogo">
        <Icon size="53px" icon="egm-logo" />
        <Icon size="53px" icon="jandarma-icon" />
      </div>
      <div className="headerContent">
        <nav className="headerInfo">
          <ul>
            <li>
              <div className="headerInfoNumbers newCases">0</div>
              <div>{t('new_cases')}</div>
            </li>
            <li>
              <div className="headerInfoNumbers">0</div>
              <div>{t('following_cases')}</div>
            </li>
            <li>
              <div className="headerInfoNumbers">0</div>
              <div>{t('victim')}</div>
            </li>
          </ul>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
