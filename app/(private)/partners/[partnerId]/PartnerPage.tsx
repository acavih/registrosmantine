"use client"
import { Button, Group, Table, Text, TextInput, Title } from '@mantine/core';
import EditPartnerForm from './EditPartnerForm';

export default function PartnerPage ({partner}) {
    return (
        <>
            <Group>
                <Title>{partner.name} {partner.surname}</Title>
                <Group ml="auto">
                    <EditPartnerForm partner={partner} />
                </Group>
            </Group>
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Td>{partner.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Apellidos</Table.Th>
                        <Table.Td>{partner.surname}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Correo electrónico</Table.Th>
                        <Table.Td>{partner.email}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Teléfono</Table.Th>
                        <Table.Td>{partner.phone}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Tarjeta sip</Table.Th>
                        <Table.Td>{partner.sipcard}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    )
}