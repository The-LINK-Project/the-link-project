import {defineRouting} from 'next-intl/routing';

const routing = defineRouting({
  locales: ['en', 'ta', 'bn'],
  defaultLocale: 'en'
});

export default routing; // ✅ required
export {routing};       // (optional, for named imports in code)
