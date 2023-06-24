import { BackPageButton, Editor, Layout, SearchInput } from '@/components';
import {
    Box,
    Button,
    Card,
    Flex,
    Group,
    Loader,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Head from 'next/head';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';

export default function Page() {
    const [filters, setFilters] = useState({
        code: '',
    });
    const queryClient = useQueryClient();

    const { data, status, error, refetch } = useQuery({
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
            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
                    <Group>
                        <SearchInput
                            placeholder="Search Parts Of Speech"
                            onSearch={({ search }) => {
                                setFilters((current) => ({
                                    ...current,
                                    code: search,
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
                            <Button
                                component="a"
                                variant="default"
                                leftIcon={<IconPlus />}
                            >
                                Add new
                            </Button>
                        </NextLink>
                    </Group>
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
                                <Group>
                                    <Title order={3}>{item?.word}</Title>
                                </Group>

                                <Editor
                                    toolbar={false}
                                    editable={false}
                                    content={JSON.parse(item?.description)}
                                />
                            </Card>
                        ))}
                    </Stack>
                )}
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
