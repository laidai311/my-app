import React, { useCallback } from 'react';
import Head from 'next/head';
import { BackPageButton, Editor, Layout } from '@/components';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import wordsApi from '@/libs/api/words';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import dictionaryApi from '@/libs/api/dictionary';
import _ from 'lodash';
import fn from '@/libs/fn';
import { useDidUpdate } from '@mantine/hooks';
import {
    ActionIcon,
    Button,
    Center,
    Flex,
    Loader,
    LoadingOverlay,
    Paper,
    Select,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconFocus } from '@tabler/icons-react';
import { useAuth } from '@/components/AuthFirebase';

export default function InsertPage() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            order: router.query?.total ? +router.query?.total + 1 : 1,
        },

        validate: {
            word: (value) => (value ? null : 'Invalid word'),
            search: (value) => (value ? null : 'Invalid search'),
            partOfSpeech: (value) => (value ? null : 'Invalid partOfSpeech'),
        },
    });

    const { mutate: insertWord, isLoading: insertLoading } = useMutation({
        mutationFn: (data) => wordsApi.insert(data),
        mutationKey: ['insertWord'],
    });

    const throttleCode = useCallback(
        _.throttle((val) => {
            form.setFieldValue('search', fn.toSearch(val));
        }, 300),
        []
    );

    useDidUpdate(() => {
        throttleCode(form.values.word);
    }, [form.values.word]);

    const { refreshToken } = useAuth();

    const onSubmit = (value) => {
        insertWord(value, {
            onSuccess: (data) => {
                notifications.show({
                    title: 'Insert word',
                    message: data?.message || 'Insert success',
                    color: 'green',
                    autoClose: 5 * 1000,
                });
                queryClient.resetQueries({
                    queryKey: ['searchWords'],
                });
                router.back();
            },
            onError: (err) => {
                notifications.show({
                    title: 'Insert word',
                    message: err?.message || 'Insert error',
                    color: 'red',
                    autoClose: 5 * 1000,
                });

                if (err?.code === 'token-expired') {
                    refreshToken();
                }
            },
        });
    };

    const {
        mutate: searchDictionaryApi,
        isLoading: searchDictionaryApiIsLoading,
    } = useMutation({
        mutationFn: (word) => dictionaryApi.search(word),
        mutationKey: ['searchDictionaryApi'],
    });

    const searchPOSCache = queryClient.getQueryData(['searchPartsOfSpeech']);

    const {
        data: _partsOfSpeechData,
        refetch: searchPartsOfSpeech,
        isLoading: searchPOSIsLoading,
        error: searchPOSError,
    } = useQuery({
        queryFn: () => partsOfSpeechApi.search({ search: '' }),
        queryKey: ['searchPartsOfSpeech'],
        enabled: false,
        initialData: searchPOSCache,
    });

    const partsOfSpeechData = _partsOfSpeechData
        ? _partsOfSpeechData?.data?.items?.map((item) => ({
              label: item?.word,
              value: item?.id,
          }))
        : [];

    return (
        <>
            <Head>
                <title>Insert Parts of speech</title>
            </Head>

            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
                </Flex>

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack pos="relative">
                        <LoadingOverlay visible={insertLoading} />
                        <TextInput
                            withAsterisk
                            label="Word"
                            placeholder="Noun"
                            autoCapitalize="off"
                            {...form.getInputProps('word')}
                        />
                        <TextInput
                            label="Phonetic"
                            placeholder="Phonetic"
                            autoCapitalize="off"
                            rightSection={
                                <ActionIcon
                                    loading={searchDictionaryApiIsLoading}
                                    onClick={() => {
                                        if (!form.values.word) return;
                                        searchDictionaryApi(form.values.word, {
                                            onSuccess: (data) => {
                                                if (
                                                    data?.length &&
                                                    data[0].phonetic
                                                ) {
                                                    form.setFieldValue(
                                                        'phonetic',
                                                        data[0].phonetic?.replaceAll(
                                                            '/',
                                                            ''
                                                        )
                                                    );
                                                } else {
                                                    notifications.show({
                                                        title: 'Phonetic Not Found!',
                                                        color: 'red',
                                                        autoClose: 5 * 1000,
                                                    });
                                                }
                                            },
                                            onError: (err) => {
                                                notifications.show({
                                                    title: 'DictionaryApi Error',
                                                    message:
                                                        err?.message || 'Error',
                                                    color: 'red',
                                                    autoClose: 5 * 1000,
                                                });
                                            },
                                        });
                                    }}
                                >
                                    <IconFocus />
                                </ActionIcon>
                            }
                            {...form.getInputProps('phonetic')}
                        />
                        <Select
                            withAsterisk
                            label="Part of speech"
                            placeholder="Pick one"
                            onClick={() => {
                                if (!searchPOSCache) {
                                    searchPartsOfSpeech();
                                }
                            }}
                            nothingFound={
                                searchPOSIsLoading ? (
                                    <Loader />
                                ) : (
                                    <Text>
                                        {searchPOSError?.message || 'Trống'}
                                    </Text>
                                )
                            }
                            data={partsOfSpeechData}
                            {...form.getInputProps('partOfSpeech')}
                        />
                        <div>
                            <TextInput
                                label="Description"
                                sx={(theme) => ({ input: { display: 'none' } })}
                            />
                            {/* <Text fz={14} fw={500}>
                                Description
                            </Text> */}
                            <Editor
                                onUpdate={({ editor }) => {
                                    form.setFieldValue(
                                        'description',
                                        JSON.stringify(editor.getJSON())
                                    );
                                }}
                            />
                        </div>
                        <TextInput
                            withAsterisk
                            label="Search"
                            placeholder="noun"
                            autoCapitalize="off"
                            {...form.getInputProps('search')}
                        />
                        <Center>
                            <Button type="submit">Submit</Button>
                        </Center>
                    </Stack>
                </form>
            </Paper>
        </>
    );
}

InsertPage.getLayout = (page) => <Layout>{page}</Layout>;
