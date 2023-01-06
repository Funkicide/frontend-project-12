import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 row justify-content-center align-content-center">
      <Spinner variant="primary" animation="border" role="status">
        <span className="visually-hidden">{t('components.chat.spinner')}</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
