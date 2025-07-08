import GalleryClientPage from "@/components/gallery-client-page";
import { getTranslator } from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslator(locale, 'GalleryPage');
 
  return {
    title: `${t('title')} | Alfarid Estates`,
    description: t('subtitle'),
  };
}

export default function GalleryPage() {
  return <GalleryClientPage />;
}
