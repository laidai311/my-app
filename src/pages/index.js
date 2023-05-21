import Head from 'next/head';
import {
    Button,
    Chip,
    ColorInput,
    ColorPicker,
    Drawer,
    Group,
    Input,
    Modal,
    ScrollArea,
    Select,
} from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { HeaderMegaMenu } from '@/layouts/Headers';
import { NavbarNested } from '@/layouts/Navbar';
import { PasswordStrength } from '@/contents/SignIn/PasswordStrength';
import SidebarLayout from '@/layouts/BaseLayout';

export default function HomePage() {
    const tempFn = React.useRef(undefined);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
            </Head>
            <PasswordStrength />
            <ColorPicker
                format="hex"
                swatches={[
                    '#25262b',
                    '#868e96',
                    '#fa5252',
                    '#e64980',
                    '#be4bdb',
                    '#7950f2',
                    '#4c6ef5',
                    '#228be6',
                    '#15aabf',
                    '#12b886',
                    '#40c057',
                    '#82c91e',
                    '#fab005',
                    '#fd7e14',
                ]}
            />
            <Chip variant="filled" defaultChecked>
                Awesome chip
            </Chip>
            <Button onClick={() => tempFn.current?.()}>Click me!</Button>
            <Input icon={<IconAt />} placeholder="Your email" />
            <Select
                label="Your favorite framework/library"
                placeholder="Pick one"
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
        </>
    );
}

HomePage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
