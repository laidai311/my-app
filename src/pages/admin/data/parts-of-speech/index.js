import { BackPageButton, Editor, Layout, SearchInput } from '@/components';
import {
    ActionIcon,
    Button,
    Card,
    ColorSwatch,
    Divider,
    Flex,
    Group,
    Menu,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { IconAlignRight, IconPlus } from '@tabler/icons-react';
import Head from 'next/head';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';

export default function Page() {
    const [filters, setFilters] = useState({
        search: '',
    });
    const queryClient = useQueryClient();

    const { data, status, error } = useQuery({
        queryKey: ['searchPartsOfSpeech', filters],
        queryFn: () => partsOfSpeechApi.search(filters),
        staleTime: 10 * 1000,
        initialData: () =>
            queryClient.getQueryData(['searchPartsOfSpeech', filters]),
    });

    const items = data?.data?.items || [];
    const total = data?.data?.total || 0;

    return (
        <>
            <Head>
                <title>Parts of speech list</title>
            </Head>

            <Paper my="lg">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="start"
                    gap="md"
                    mb="lg"
                >
                    <BackPageButton />
                    <Flex
                        w={{ base: '100%', md: 'auto' }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        align="flex-end"
                        gap="md"
                    >
                        <SearchInput
                            placeholder="Search Parts Of Speech"
                            onSearch={({ search }) => {
                                setFilters((current) => ({
                                    ...current,
                                    search,
                                }));
                            }}
                        />
                        <NextLink
                            href={{
                                pathname: 'parts-of-speech/insert',
                                query: { total },
                            }}
                            passHref
                        >
                            <Button component="a" leftIcon={<IconPlus />}>
                                Add new
                            </Button>
                        </NextLink>
                    </Flex>
                </Flex>

                {status === 'loading' ? (
                    <Card>
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Card>
                ) : status === 'error' ? (
                    <Card>
                        <Text>{error?.message || 'Error!'}</Text>
                    </Card>
                ) : (
                    <Stack>
                        {items.map((item) => (
                            <Card key={item?.id}>
                                <Stack>
                                    <Flex justify="space-between">
                                        <Flex direction="column">
                                            <Group>
                                                <Title order={3}>
                                                    {item?.word}
                                                </Title>
                                                {item?.phonetic && (
                                                    <Text>
                                                        /{item?.phonetic}/
                                                    </Text>
                                                )}
                                                {item?.hexColor && (
                                                    <ColorSwatch
                                                        color={item?.hexColor}
                                                    />
                                                )}
                                            </Group>
                                            <Text>{item?.translation}</Text>
                                        </Flex>
                                        <Menu>
                                            <Menu.Target>
                                                <ActionIcon>
                                                    <IconAlignRight />
                                                </ActionIcon>
                                            </Menu.Target>

                                            <Menu.Dropdown>
                                                <Menu.Item>Edit</Menu.Item>
                                                <Menu.Item color="red">
                                                    Delete
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Flex>
                                    <Divider />
                                    <Editor
                                        toolbar={false}
                                        editable={false}
                                        content={JSON.parse(item?.description)}
                                    />
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
