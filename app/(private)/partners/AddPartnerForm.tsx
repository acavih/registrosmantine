import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetch } from 'use-http';
import ResourceInput from '@/components/resources/ResourceInput';

export default function AddPartnerForm() {
    const [opened, { open, close }] = useDisclosure();
    const { post, loading, response } = useFetch();
    return (
        <>
            <Button onClick={open}>Añadir socio</Button>

            <Modal size="lg" opened={opened} onClose={close} title="Añadir socio">
                <form
                    name="add-partner-form"
                    method="post"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target as HTMLFormElement);
                        const result = await post('/api/partners', fd);
                        if (!response.ok) {
                            console.dir(response);
                        }
                        console.log(result);
                    }}
                >
                    <TextInput label="Código" name="code" />
                    <TextInput label="Nombre" name="name" />
                    <TextInput label="Apellidos" name="surname" />
                    <TextInput label="Correo electrónico" name="email" />
                    <TextInput label="Teléfono" name="phone" />
                    <TextInput label="Tarjeta SIP" name="sipcard" />
                    <ResourceInput typeResource="sex" label="Sexo" name="sex" />
                    <ResourceInput typeResource="partnerState" label="Eastado del socio" name="partnerState" />
                    <ResourceInput typeResource="nationality" label="Nacionalidad" name="nationality" />
                    <ResourceInput typeResource="residency" label="Residencia" name="residency" />
                    <ResourceInput typeResource="howdidknowus" label="Como nos conoció" name="howdidknowus" />
                    <ResourceInput typeResource="yeardidknowus" label="Año en que nos conoció" name="yeardidknowus" />
                    <Group mt="md">
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            Añadir socio
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>

    );
}
