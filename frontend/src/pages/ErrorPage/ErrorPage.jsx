import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 row justify-content-center align-content-center">
      <h1 className="text-center">{t('pages.error.errorMessage')}</h1>
      <p className="text-center">{t('pages.error.notExist')}</p>
    </div>
  );
};

export default ErrorPage;
