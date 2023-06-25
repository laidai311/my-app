import React, { useEffect, useState } from 'react';
import { useStore } from '@/libs/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import wordsApi from '@/libs/api/words';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import { BackPageButton, Editor, Layout, SearchInput } from '@/components';
import Head from 'next/head';
import {
    Card,
    Divider,
    Flex,
    Group,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import NextLink from 'next/link';

export default function Page() {
    const { getValue, setValue } = useStore();
    const [filters, setFilters] = useState({ search: '' });

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

    const { data, status, error } = useQuery({
        queryKey: ['searchWord', filters],
        queryFn: () => wordsApi.search(filters),
        enabled: !searchPOSIsLoading,
        initialData: () => queryClient.getQueryData(['searchWord', filters]),
        onSuccess: () => {
            setValue('searchDictionary', '');
        },
    });

    const items = data
        ? data?.data?.items?.map((item) => ({
              ...item,
              partOfSpeech: getPOSById(item.partOfSpeech),
          }))
        : [];

    useEffect(() => {
        const search = getValue('searchDictionary');
        if (search) {
            setFilters((current) => ({
                ...current,
                search,
            }));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Dictionary</title>
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
                            search={filters.search}
                            placeholder="Search word"
                            onSearch={({ search }) => {
                                setFilters((current) => ({
                                    ...current,
                                    search,
                                }));
                            }}
                        />
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
                                            <NextLink
                                                passHref
                                                href={`dictionary/${data?.id}`}
                                            >
                                                <Title
                                                    order={3}
                                                    style={{}}
                                                    sx={() => ({
                                                        textDecoration: 'none',
                                                    })}
                                                >
                                                    {data?.word}
                                                </Title>
                                            </NextLink>
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
