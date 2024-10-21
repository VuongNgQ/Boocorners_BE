import { allLangs } from '../all-langs';

// ----------------------------------------------------------------------

export function formatNumberLocale() {
  const currentLang = allLangs.find((lang) => lang.value === 'vi');

  return { code: currentLang?.numberFormat.code, currency: currentLang?.numberFormat.currency };
}
