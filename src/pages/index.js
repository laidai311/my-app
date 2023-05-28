import Head from 'next/head';
import {
    Anchor,
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
import BaseLayout from '@/layouts/BaseLayout';
import NextLink from 'next/link';

export default function HomePage() {
    const tempFn = React.useRef(undefined);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
            </Head>
            <NextLink
                href="/dictionary"
                passHref
                style={{ textDecoration: 'none' }}
            >
                <Anchor>Dictionary</Anchor>
            </NextLink>
        </>
    );
}

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
