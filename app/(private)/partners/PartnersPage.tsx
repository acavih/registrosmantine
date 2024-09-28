'use client';

import { Button, Group, Table, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import AddPartnerForm from './AddPartnerForm';

function PartnerRow({ element }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <FaCaretDown style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)} />
                </Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>{element.surname}</Table.Td>
                <Table.Td>{element.email}</Table.Td>
                <Table.Td>{element.phone}</Table.Td>
                <Table.Td>
                    <Button size="xs">Ver socio</Button>
                </Table.Td>
            </Table.Tr>
            {expanded && <Table.Tr>
                <Table.Td colSpan={5}>
                    <Text>Observaciones</Text>
                </Table.Td>
            </Table.Tr>}
        </>
    );
}

export default function PartnersPage({ partners }) {
    return (
        <>
            <Group>
                <Title>Listado de socios</Title>
                <Group ml="auto">
                    <AddPartnerForm />
                </Group>
            </Group>
            <TextInput label="Buscar socio" />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Apellidos</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Teléfono</Table.Th>
                        <Table.Th>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{partners.map((element) =>
                    <PartnerRow key={element.position} element={element} />
                )}</Table.Tbody>
            </Table>
        </>
    );
}
