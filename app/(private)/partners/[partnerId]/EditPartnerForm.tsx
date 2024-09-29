import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetch } from 'use-http';
import ResourceInput from '@/components/resources/ResourceInput';
import { DatePickerInput  } from "@mantine/dates";

export default function EditPartnerForm({partner}) {
    const [opened, { open, close }] = useDisclosure();
    const { post, loading, response } = useFetch();
    console.log(partner)
    return (
        <>
            <Button onClick={open}>Editar socio socio</Button>

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
                            return
                        }
                        console.log(result);
                        close()
                    }}
                >
                    <TextInput label="Código" name="code" defaultValue={partner.code} />
                    <TextInput label="Nombre" name="name" defaultValue={partner.name} />
                    <TextInput label="Apellidos" name="surname" defaultValue={partner.surname} />
                    <TextInput label="Correo electrónico" name="email" defaultValue={partner.email} />
                    <TextInput label="Teléfono" name="phone" defaultValue={partner.phone} />
                    <TextInput label="Tarjeta SIP" name="sipcard" defaultValue={partner.sipcard} />
                    <DatePickerInput  label="Fecha de nacimiento" name='birthdate' defaultValue={partner.birthdate} />
                    <Textarea label="Observaciones" name="notes" defaultValue={partner.notes} />
                    <Textarea label="Pendiente" name="pendent" defaultValue={partner.pendent} />
                    <ResourceInput typeResource="sex" label="Sexo" name="sex" defaultValue={partner.resources_sex.id} />
                    <ResourceInput typeResource="partnerState" label="Eastado del socio" name="partnerState" defaultValue={partner.resources_partnerstates.id} />
                    <ResourceInput typeResource="nationality" label="Nacionalidad" name="nationality" defaultValue={partner.resources_nationalities.id} />
                    <ResourceInput typeResource="residency" label="Residencia" name="residency" defaultValue={partner.resources_residencies.id} />
                    <ResourceInput typeResource="howdidknowus" label="Como nos conoció" name="howdidknowus" defaultValue={partner.resources_howdidknowus.id} />
                    <ResourceInput typeResource="yeardidknowus" label="Año en que nos conoció" name="yeardidknowus" defaultValue={partner.resources_yeardidknowus.id} />
                    <Group mt="md">
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            Guardar cambios
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>

    );
}
