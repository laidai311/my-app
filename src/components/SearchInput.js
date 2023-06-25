import { ActionIcon, Button, Group, Kbd, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useHotkeys } from '@mantine/hooks';
import { IconCircleXFilled, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react';

export default function SearchInput({
    search,
    onSearch,
    buttonProps,
    ...others
}) {
    const ref = useRef();
    const form = useForm({
        initialValues: {
            search: '',
        },
    });
    useHotkeys([['/', () => ref.current && ref.current.focus()]]);

    useEffect(() => {
        if (!form.values.search && search) {
            form.setFieldValue('search', search);
        }
    }, [search]);

    return (
        <form onSubmit={form.onSubmit(onSearch)}>
            <Group noWrap>
                <TextInput
                    {...others}
                    ref={ref}
                    autoCapitalize="off"
                    icon={<IconSearch />}
                    rightSection={
                        form.values.search ? (
                            <ActionIcon
                                onClick={() => {
                                    form.reset();
                                    onSearch?.({ search: '' });
                                }}
                            >
                                <IconCircleXFilled />
                            </ActionIcon>
                        ) : (
                            <Kbd>/</Kbd>
                        )
                    }
                    {...form.getInputProps('search')}
                />
                <Button {...buttonProps} type="submit">
                    Search
                </Button>
            </Group>
        </form>
    );
}
