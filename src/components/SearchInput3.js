import { Input, Kbd } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React, { useRef } from 'react';

export default function SearchInput(props) {
    const ref = useRef();

    useHotkeys([['/', () => ref.current && ref.current.focus()]]);

    return (
        <Input
            {...props}
            ref={ref}
            w={{ md: 600 }}
            icon={<IconSearch size={20} />}
            radius="xl"
            size="lg"
            placeholder="Search"
            type="search"
            role="combobox"
            aria-controls="matches"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            rightSection={<Kbd sx={{ userSelect: 'none' }}>/</Kbd>}
        />
    );
}
