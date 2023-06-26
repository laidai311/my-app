import React from 'react';
import {
    ActionIcon,
    Button,
    Container,
    Flex,
    Group,
    Header,
    Menu,
    useMantineColorScheme,
} from '@mantine/core';
import {
    IconBrandGithub,
    IconBrandGooglePodcasts,
    IconBrightnessUp,
    IconMoon,
} from '@tabler/icons-react';
import NextLink from 'next/link';
import { useAuth } from '@/components/AuthFirebase';

export default function Layout(props) {
    const { data: user, signOutApp } = useAuth();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <>
            <Header px="sm" fixed>
                <Flex h={60} justify="space-between" align="center">
                    {user ? (
                        <Menu width={200}>
                            <Menu.Target>
                                <ActionIcon>
                                    <IconBrandGooglePodcasts />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <NextLink passHref href="/">
                                    <Menu.Item>Home</Menu.Item>
                                </NextLink>
                                <NextLink passHref href="/dictionary">
                                    <Menu.Item>Dictionary</Menu.Item>
                                </NextLink>
                                <NextLink passHref href="/admin">
                                    <Menu.Item>Admin</Menu.Item>
                                </NextLink>
                                <Menu.Item onClick={signOutApp}>
                                    Log out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        <NextLink passHref href="/sign-in">
                            <Button>Log in</Button>
                        </NextLink>
                    )}

                    <Group>
                        <NextLink
                            passHref
                            target="_blank"
                            href="https://github.com/laidaid/my-app"
                        >
                            <ActionIcon>
                                <IconBrandGithub />
                            </ActionIcon>
                        </NextLink>
                        <ActionIcon onClick={() => toggleColorScheme()}>
                            {colorScheme === 'dark' ? (
                                <IconBrightnessUp />
                            ) : (
                                <IconMoon />
                            )}
                        </ActionIcon>
                    </Group>
                </Flex>
            </Header>

            <Container component="main" pt={60} {...props} />
        </>
    );
}
