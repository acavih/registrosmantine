'use client';

import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PrivateLayout({ children }: { children: any }) {
    const router = useRouter();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header bg="blue" c="#fff">
                <Group h="100%" px="md">
                    <Burger color='white' opened={false} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger color='white' opened={false} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    Registros
                    <Group ml="auto">
                        <Button onClick={async () => {
                            await signOut({redirect: false})
                            router.refresh();
                        }}>Logout</Button>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavLink component={Link} label="Usuarios" href="/users" />
                <NavLink component={Link} label="Socios" href="/partners" />
                <NavLink label="Atenciones">
                    <NavLink component={Link} label="Últimas atenciones" href="/last-attentions" />
                    <NavLink component={Link} label="Atenciones pendientes" href="/last-attentions" />
                </NavLink>
                <NavLink component={Link} label="Estadísticas" href="/stats" />
                <NavLink component={Link} label="Recursos" href="/resources" />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
