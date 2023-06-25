import { Editor, Layout } from '@/components';
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import wordsApi from '@/libs/api/words';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export async function getStaticProps(context) {
    const id = context.params?.id;

    return {
        props: { id },
    };
}

export default function Page({ id }) {
    const queryClient = useQueryClient();

    const searchPOSCache = queryClient.getQueryData(['searchPartsOfSpeech']);

    const { data: partsOfSpeechData, isLoading: searchPOSIsLoading } = useQuery(
        {
            queryFn: () => partsOfSpeechApi.search({ search: '' }),
            queryKey: ['searchPartsOfSpeech'],
            initialData: searchPOSCache,
            enabled: !!id,
        }
    );

    const getPOSById = (id) => {
        if (!partsOfSpeechData) return '';
        return (
            partsOfSpeechData?.data?.items?.find((item) => item.id === id) || ''
        );
    };

    const {
        data: wordData,
        status,
        error,
    } = useQuery({
        queryKey: ['getWord'],
        queryFn: () => wordsApi.get({ id }),
        enabled: !searchPOSIsLoading,
    });

    const data = wordData
        ? {
              ...wordData?.data,
              partOfSpeech: getPOSById(wordData?.partOfSpeech),
          }
        : {};
    console.log(data);
    return (
        <>
            <Head>
                <title>Word</title>
            </Head>

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
                <Paper my="lg">
                    <Card key={data?.id} mb="lg">
                        <Stack>
                            <Flex direction="column">
                                <Group>
                                    <Title order={3}>{data?.word}</Title>
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
                </Paper>
            )}
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
