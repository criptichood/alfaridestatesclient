import VideosClientPage from "@/components/videos-client-page";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'VideosPage'});
 
  return {
    title: `${t('title')} | Alfarid Estates`,
    description: t('subtitle'),
  };
}


export default function VideosPage() {
  return <VideosClientPage isPage={true} />;
}
