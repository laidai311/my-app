import {
    ActionIcon,
    Box,
    Burger,
    Button,
    Group,
    Header,
    Input,
    Kbd,
    Navbar,
    ScrollArea,
    Tooltip,
    createStyles,
    rem,
    useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { LinksGroup } from '../LinkGroup';
import { useLockBodyScroll2 } from '@/libs/hooks';
import { sidebarData } from './config';
import Head from 'next/head';
import {
    IconBook2,
    IconBrandGithub,
    IconBrightnessUp,
    IconMoon,
    IconSearch,
} from '@tabler/icons-react';
import UserMenuDropdown from '../comps/UserMenuDropdown';
import NextLink from 'next/link';
import { useAuth } from '@/components/AuthFirebase';

const useStyles = createStyles((theme) => ({
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function BaseLayout({ children }) {
    const { data: user } = useAuth();
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);

    useLockBodyScroll2(navbarOpened);

    const links = sidebarData.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

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
            <Box pt={60} pl={{ sm: 260 }}>
                <Header height={60} px="md" fixed>
                    <Group position="apart" sx={{ height: '100%' }}>
                        <Burger
                            size={18}
                            opened={navbarOpened}
                            onClick={toggleNavbar}
                            className={classes.hiddenDesktop}
                        />
                        <NextLink passHref href="/">
                            <Button
                                variant="subtle"
                                leftIcon={<IconBook2 size={24} />}
                            >
                                Dailai9966
                            </Button>
                        </NextLink>
                        <Group className={classes.hiddenMobile}>
                            <Input
                                icon={<IconSearch size={13} />}
                                radius="md"
                                placeholder="Search"
                                rightSection={<Kbd size="xs">/</Kbd>}
                            />
                        </Group>

                        <Group spacing={7}>
                            <Group spacing={7} className={classes.hiddenMobile}>
                                <ActionIcon size="lg" radius="xl">
                                    <IconBrandGithub />
                                </ActionIcon>
                                <Tooltip
                                    position="bottom"
                                    label={
                                        colorScheme === 'dark'
                                            ? 'Light mode'
                                            : 'Dark mode'
                                    }
                                >
                                    <ActionIcon
                                        size="lg"
                                        radius="xl"
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

                            {user ? (
                                <UserMenuDropdown />
                            ) : (
                                <NextLink passHref href="/sign-in">
                                    <Button size="xs">Log in</Button>
                                </NextLink>
                            )}
                        </Group>
                    </Group>
                </Header>

                <Navbar
                    fixed
                    sx={(theme) => ({
                        display: navbarOpened ? 'block' : 'none',
                        width: '100%',

                        [theme.fn.largerThan('sm')]: {
                            display: 'block',
                            width: 260,
                        },
                    })}
                >
                    <ScrollArea
                        sx={{
                            height: `calc(var(--window-height) - ${rem(60)})`,
                        }}
                    >
                        <Navbar.Section grow>
                            <div>{links}</div>
                        </Navbar.Section>
                    </ScrollArea>
                </Navbar>

                <Box component="main" p={{ sm: 'md' }}>
                    {children}
                </Box>
            </Box>
        </>
    );
}
