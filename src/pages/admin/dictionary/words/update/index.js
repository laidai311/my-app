import React, { useCallback, useEffect } from 'react';
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
    Card,
    Center,
    Flex,
    Loader,
    LoadingOverlay,
    Paper,
    Select,
    Skeleton,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconFocus } from '@tabler/icons-react';

export default function UpdatePage() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm({
        initialValues: {},

        validate: {
            word: (value) => (value ? null : 'Invalid word'),
            search: (value) => (value ? null : 'Invalid search'),
            partOfSpeech: (value) => (value ? null : 'Invalid partOfSpeech'),
        },
    });

    const { status, error } = useQuery({
        queryKey: ['getWord'],
        queryFn: () => wordsApi.get({ id: router.query?.id }),
        enabled: !!router.query?.id,
        onSuccess: (data) => {
            if (data.data) {
                form.setValues(data.data);
            } else {
                notifications.show({
                    title: 'Get word',
                    message: data?.message || 'Get error',
                    color: 'red',
                    autoClose: 5 * 1000,
                });
            }
        },
        onError: (err) => {
            notifications.show({
                title: 'Get word',
                message: err?.message || 'Get error',
                color: 'red',
                autoClose: 5 * 1000,
            });
        },
    });

    const { mutate: updateWord, isLoading: updateLoading } = useMutation({
        mutationFn: (data) => wordsApi.update(data),
        mutationKey: ['updateWord'],
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

    const onSubmit = (value) => {
        updateWord(
            { id: router.query?.id, ...value },
            {
                onSuccess: (data) => {
                    notifications.show({
                        title: 'Update word',
                        message: data?.message || 'Update success',
                        color: 'green',
                        autoClose: 5 * 1000,
                    });
                    queryClient.resetQueries({
                        queryKey: ['searchWord'],
                    });
                    router.back();
                },
                onError: (err) =>
                    notifications.show({
                        title: 'Update word',
                        message: err?.message || 'Update error',
                        color: 'red',
                        autoClose: 5 * 1000,
                    }),
            }
        );
    };

    const { mutate: searchDictionaryApi, isLoading: searchDictApiIsLoading } =
        useMutation({
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

    useEffect(() => {
        if (form.values?.partOfSpeech && !searchPOSCache) {
            searchPartsOfSpeech();
        }
    }, [form.values?.partOfSpeech]);

    const partsOfSpeechData = _partsOfSpeechData
        ? _partsOfSpeechData?.data?.items?.map((item) => ({
              label: item?.word,
              value: item?.id,
          }))
        : [];

    return (
        <>
            <Head>
                <title>Update Parts of speech</title>
            </Head>

            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
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
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack pos="relative">
                            <LoadingOverlay visible={updateLoading} />
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
                                        loading={searchDictApiIsLoading}
                                        onClick={() => {
                                            if (!form.values.word) return;
                                            searchDictionaryApi(
                                                form.values.word,
                                                {
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
                                                                autoClose:
                                                                    5 * 1000,
                                                            });
                                                        }
                                                    },
                                                    onError: (err) => {
                                                        notifications.show({
                                                            title: 'DictionaryApi Error',
                                                            message:
                                                                err?.message ||
                                                                'Error',
                                                            color: 'red',
                                                            autoClose: 5 * 1000,
                                                        });
                                                    },
                                                }
                                            );
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
                                    sx={(theme) => ({
                                        input: { display: 'none' },
                                    })}
                                    {...form.getInputProps('description')}
                                />
                                <Editor
                                    content={
                                        form.values.description
                                            ? JSON.parse(
                                                  form.values.description
                                              )
                                            : ''
                                    }
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
                )}
            </Paper>
        </>
    );
}

UpdatePage.getLayout = (page) => <Layout>{page}</Layout>;
