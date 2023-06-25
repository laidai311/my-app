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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import wordsApi from '@/libs/api/words';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import { modals } from '@mantine/modals';

export default function Page() {
    const [filters, setFilters] = useState({
        search: '',
    });
    const queryClient = useQueryClient();

    const searchPOSCache = queryClient.getQueryData(['searchPartsOfSpeech']);

    const { data: partsOfSpeechData, isLoading: searchPOSIsLoading } = useQuery(
        {
            queryFn: () => partsOfSpeechApi.search({ search: '' }),
            queryKey: ['searchPartsOfSpeech'],
            initialData: searchPOSCache,
        }
    );

    const getPOSById = (id) => {
        if (!partsOfSpeechData) return '';
        return (
            partsOfSpeechData?.data?.items?.find((item) => item.id === id) || ''
        );
    };

    const { data, status, error, refetch } = useQuery({
        queryKey: ['searchWord', filters],
        queryFn: () => wordsApi.search(filters),
        enabled: !searchPOSIsLoading,
        initialData: () => queryClient.getQueryData(['searchWord', filters]),
    });

    const total = data?.data?.total || 0;
    const items = data
        ? data?.data?.items?.map((item) => ({
              ...item,
              partOfSpeech: getPOSById(item.partOfSpeech),
          }))
        : [];

    const { mutate: deleteWord } = useMutation({
        mutationKey: ['deleteWord'],
        mutationFn: ({ id }) => wordsApi.delete({ id }),
        onSuccess: () => refetch(),
    });

    const handleDelete = (value) => {
        modals.openConfirmModal({
            title: 'Delete your word',
            styles: (theme) => ({
                overlay: {
                    zIndex: 1002,
                },
                inner: {
                    zIndex: 1003,
                },
            }),
            centered: true,
            keepMounted: false,
            transitionProps: { duration: 200 },
            children: (
                <Text size="sm">
                    Are you sure you want to delete your word? This action is
                    destructive and you will have to contact support to restore
                    your data.
                </Text>
            ),
            labels: { confirm: 'Delete word', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteWord({ id: value?.id }),
        });
    };

    return (
        <>
            <Head>
                <title>Words list</title>
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
                            placeholder="Search word"
                            onSearch={({ search }) => {
                                setFilters((current) => ({
                                    ...current,
                                    search,
                                }));
                            }}
                        />
                        <NextLink
                            href={{
                                pathname: 'words/insert',
                                query: { total },
                            }}
                            passHref
                        >
                            <Button leftIcon={<IconPlus />}>Add new</Button>
                        </NextLink>
                    </Flex>
                </Flex>

                {status === 'loading' ? (
                    <Card>
                        <Skeleton height={30} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </Card>
                ) : status === 'error' ? (
                    <Card>
                        <Text>{error?.message || 'Error!'}</Text>
                    </Card>
                ) : (
                    items.map((data) => (
                        <Card key={data?.id} mb="lg">
                            <Stack>
                                <Flex justify="space-between">
                                    <Flex direction="column">
                                        <Group>
                                            <Title order={3}>
                                                {data?.word}
                                            </Title>
                                            {data?.phonetic && (
                                                <Text>/{data?.phonetic}/</Text>
                                            )}
                                        </Group>
                                        {data?.partOfSpeech && (
                                            <Text>
                                                {data?.partOfSpeech?.word || ''}
                                            </Text>
                                        )}
                                    </Flex>
                                    <Menu>
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconAlignRight />
                                            </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <NextLink
                                                passHref
                                                href={{
                                                    pathname: 'words/update',
                                                    query: { id: data?.id },
                                                }}
                                            >
                                                <Menu.Item>Edit</Menu.Item>
                                            </NextLink>
                                            <Menu.Item
                                                color="red"
                                                onClick={() =>
                                                    handleDelete(data)
                                                }
                                            >
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Flex>
                                <Divider />
                                <Editor
                                    toolbar={false}
                                    editable={false}
                                    content={
                                        data?.description
                                            ? JSON.parse(data?.description)
                                            : ''
                                    }
                                />
                            </Stack>
                        </Card>
                    ))
                )}
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
