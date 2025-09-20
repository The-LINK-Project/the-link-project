'use client';
//Adrish, making it look nice is not a priority
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import styles from './LocaleSwticher.module.css';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <select
      className={styles.localeSelect}
      value={locale}
      onChange={e => switchLocale(e.target.value)}>
      <option value="en">EN</option>
      <option value="de">DE</option>
      <option value="it">IT</option>
    </select>
  );
}