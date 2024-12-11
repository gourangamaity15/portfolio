import useGlobalContext from '../use-global-context';
import  useTranslationClient  from '../use-translation-client';
import { UseTranslationOptions } from 'react-i18next';

const useLocale = (
  namespace: string | string[],
  options?: UseTranslationOptions<string> | undefined,
  cookieName?: string | undefined
) => {
  const { state } = useGlobalContext();

  const { t } = useTranslationClient(
    state.locale.lang,
    namespace,
    options,
    cookieName
  );

  return { t };
};

export default useLocale;
