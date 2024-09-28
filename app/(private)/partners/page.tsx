import { dbClient } from '@/utils/db';
import PartnersPage from './PartnersPage';

export default async function Page() {
    const partners = await dbClient.partners.findMany({
        take: 20,
    });

    return (
        <PartnersPage partners={partners} />
    );
}
