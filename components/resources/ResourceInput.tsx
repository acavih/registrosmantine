import { Select, SelectProps } from '@mantine/core';
import { useFetch } from 'use-http';

type ResourceInputProps = SelectProps & {
    typeResource: string
};

export default function ResourceInput({ typeResource, ...inputProps }: ResourceInputProps) {
    const { data, loading } = useFetch<{ list: Array<{ id: number, name: string }> }>(
        `/api/resources/list?typeResource=${typeResource}`,
        []
    );

    if (loading) {
        return (
            <></>
        )
    }

    return (
        <Select
            {...inputProps}
            placeholder={'Seleccione...'}
            searchable
            data={data?.list.map(a => ({value: a.id.toString(), label: a.name}))  }
        />
    );
}
