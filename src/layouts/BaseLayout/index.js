import {
    ActionIcon,
    Box,
    Button,
    Flex,
    Group,
    Header,
    Menu,
    Tooltip,
    rem,
    useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import Head from 'next/head';
import {
    IconBrandGithub,
    IconBrightnessUp,
    IconExternalLink,
    IconHome,
    IconLock,
    IconLogout,
    IconMenu,
    IconMoon,
} from '@tabler/icons-react';
import UserMenuDropdown from '../comps/UserMenuDropdown';
import NextLink from 'next/link';
import { useAuth } from '@/components/AuthFirebase';

export default function BaseLayout({ children }) {
    const { data: user, signOutApp } = useAuth();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
                <meta name="description" content="Dailai9966" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box pt={60}>
                <Header p="sm" fixed>
                    <Flex justify="space-between">
                        {user ? (
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant="default">
                                        <IconMenu />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <NextLink passHref href="/">
                                        <Menu.Item
                                            icon={<IconHome />}
                                            component="a"
                                        >
                                            Home
                                        </Menu.Item>
                                    </NextLink>
                                    <NextLink passHref href="/admin">
                                        <Menu.Item
                                            icon={<IconLock />}
                                            component="a"
                                        >
                                            Admin
                                        </Menu.Item>
                                    </NextLink>
                                    <Menu.Item
                                        icon={<IconLogout />}
                                        onClick={signOutApp}
                                    >
                                        Log out
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <NextLink passHref href="/sign-in">
                                <Button component="a" variant="default">
                                    Log in
                                </Button>
                            </NextLink>
                        )}

                        <Group>
                            <NextLink
                                passHref
                                target="_blank"
                                href="https://github.com/laidaid/my-app"
                            >
                                <ActionIcon component="a" variant="default">
                                    <IconBrandGithub />
                                </ActionIcon>
                            </NextLink>
                            <Tooltip
                                position="bottom"
                                label={
                                    colorScheme === 'dark'
                                        ? 'Light mode'
                                        : 'Dark mode'
                                }
                            >
                                <ActionIcon
                                    variant="default"
                                    onClick={() => toggleColorScheme()}
                                >
                                    {colorScheme === 'dark' ? (
                                        <IconBrightnessUp />
                                    ) : (
                                        <IconMoon />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Flex>
                </Header>

                <Box component="main">{children}</Box>
            </Box>
        </>
    );
}
