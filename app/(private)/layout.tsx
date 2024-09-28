import PrivateLayout from './PrivateLayout';

export const metadata = {
    title: 'Mantine Next.js template',
    description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    );
}
