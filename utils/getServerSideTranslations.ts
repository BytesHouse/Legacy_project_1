import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default async function getServerSideTranslations(locale: any) {
    return (await serverSideTranslations(locale || 'en', [
        'common',
      ], null, ['en', 'ro', 'ru', 'ua', 'cz']))
}