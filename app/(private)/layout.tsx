import { getServerSession } from 'next-auth';
import PrivateLayout from './PrivateLayout';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Registros acavih'
};

export default async function RootLayout({ children }: { children: any }) {
    const session = await getServerSession()
    if (!session) {
        return redirect('/')
    }
    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    );
}
