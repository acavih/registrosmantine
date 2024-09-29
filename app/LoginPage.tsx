'use client';

import { AppShell, Button, Card, Container, Group, rem, TextInput, Text, Title, Alert } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const pinned = useHeadroom({ fixedAt: 120 });
    const router = useRouter()

    const [unable, setUnable] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    async function login(email: string, password: string) {
        // setLoginMessage('Credenciales incorrectas');
        console.log({ name: email, password });
        const result = await signIn('credentials', {
            redirect: false,
            email, password
        })
        console.log(result)
        if (result) {
            if (result.status < 400) {
                router.refresh()
            } else {
                setUnable(false)
                setLoginMessage(result.error ?? 'Error interno')
            }
        } else {
            setUnable(false)
            setLoginMessage('Error interno')
        }
        // router.push('/partners')
    }

    return (
        <AppShell header={{ height: 60, collapsed: !pinned, offset: false }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    Registros
                </Group>
            </AppShell.Header>

            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <Container size="sm">
                    <form
                        method="post"
                        onSubmit={async (e) => {
                            e.preventDefault();

                            setUnable(true)
                            setEmailError('');
                            setPasswordError('');
                            setLoginMessage('');

                            await new Promise(resolve => setTimeout(resolve, 500));

                            const email = e.target['email'].value;
                            const password = e.target['password'].value;

                            if (!email) setEmailError('El email es obligatorio');
                            if (!password) setPasswordError('La contraseña es obligatoria');

                            if (!email || !password) return;

                            login(email, password);
                        }}
                    >
                        <Card>
                            <Card.Section>
                                <Title>Acceder al sistema</Title>
                            </Card.Section>
                            {loginMessage.length > 0 && <Card.Section my={20}>
                                <Alert variant="light" color="red" title={loginMessage} />
                            </Card.Section>}
                            <Card.Section>
                                <TextInput name="email" label="Email" error={emailError} />
                                <TextInput name="password" type="password" label="Contraseña" error={passwordError} />
                            </Card.Section>
                            <Card.Section>
                                <Group mt="md" justify="flex-end">
                                    <Button variant="subtle" color="gray">Reset</Button>
                                    <Button disabled={unable} type="submit">Acceder</Button>
                                </Group>
                            </Card.Section>
                        </Card>
                    </form>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
