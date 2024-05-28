// LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@iqss/dataverse-design-system';
import { useContext } from 'react';
import { LanguageContext } from '../../../../shared/LanguageContext';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useContext(LanguageContext);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const getLanguageName = (lng: string) => {
    switch (lng) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'ar':
        return 'العربية';
      default:
        return 'English';
    }
  };

  return (
    <Navbar.Dropdown title={getLanguageName(i18n.language)} id="dropdown-language">
      <Navbar.Dropdown.Item href="#" onClick={() => changeLanguage('en')}>
        English
      </Navbar.Dropdown.Item>
      <Navbar.Dropdown.Item href="#" onClick={() => changeLanguage('fr')}>
        Français
      </Navbar.Dropdown.Item>
      <Navbar.Dropdown.Item href="#" onClick={() => changeLanguage('ar')}>
        العربية
      </Navbar.Dropdown.Item>
    </Navbar.Dropdown>
  );
};

export default LanguageSwitcher;
