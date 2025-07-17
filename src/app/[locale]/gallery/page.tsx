import GalleryClientPage from "@/components/gallery-client-page";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'GalleryPage'});
 
  return {
    title: `${t('title')} | Alfarid Estates`,
    description: t('subtitle'),
  };
}

export default function GalleryPage() {
  return <GalleryClientPage isPage={true} />;
}
