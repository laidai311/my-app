import React, { useCallback } from 'react';
import Head from 'next/head';
import { BackPageButton, Editor, Layout } from '@/components';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
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
    ColorInput,
    Flex,
    LoadingOverlay,
    NumberInput,
    Paper,
    Skeleton,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconFocus } from '@tabler/icons-react';

export default function InsertPage() {
    const router = useRouter();

    const form = useForm({
        initialValues: {},

        validate: {
            word: (value) => (value ? null : 'Invalid word'),
            search: (value) => (value ? null : 'Invalid search'),
            translation: (value) => (value ? null : 'Invalid translation'),
        },
    });

    const { status, error } = useQuery({
        queryKey: ['get'],
        queryFn: () => partsOfSpeechApi.get({ id: router.query?.id }),
        cacheTime: 0,
        staleTime: 0,
        enabled: !!router.query?.id,
        onSuccess: (data) => {
            if (data.data) {
                form.setValues(data.data);
            } else {
                notifications.show({
                    title: 'Get Parts Of Speech',
                    message: data?.message || 'Get error',
                    color: 'red',
                    autoClose: 5 * 1000,
                });
            }
        },
        onError: (err) => {
            notifications.show({
                title: 'Get Parts Of Speech',
                message: err?.message || 'Get error',
                color: 'red',
                autoClose: 5 * 1000,
            });
        },
    });

    const { mutate: updatePartsOfSpeech, isLoading: updateLoading } =
        useMutation({
            mutationFn: (data) => partsOfSpeechApi.update(data),
            mutationKey: ['updatePartsOfSpeech'],
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
        updatePartsOfSpeech(
            { id: router.query?.id, ...value },
            {
                onSuccess: (data) => {
                    notifications.show({
                        title: 'Update Parts Of Speech',
                        message: data?.message || 'Update success',
                        color: 'green',
                        autoClose: 5 * 1000,
                    });
                    router.back();
                },
                onError: (err) =>
                    notifications.show({
                        title: 'Update Parts Of Speech',
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
                            <ColorInput
                                w={'100%'}
                                label="Color"
                                placeholder="#f5f5f5"
                                dropdownZIndex={1011}
                                format="hex"
                                swatches={[
                                    '#25262b',
                                    '#868e96',
                                    '#fa5252',
                                    '#e64980',
                                    '#be4bdb',
                                    '#7950f2',
                                    '#4c6ef5',
                                    '#228be6',
                                    '#15aabf',
                                    '#12b886',
                                    '#40c057',
                                    '#82c91e',
                                    '#fab005',
                                    '#fd7e14',
                                ]}
                                {...form.getInputProps('hexColor')}
                            />
                            <TextInput
                                withAsterisk
                                label="Translation"
                                placeholder="Danh từ"
                                autoCapitalize="off"
                                {...form.getInputProps('translation')}
                            />
                            <NumberInput
                                required
                                label="Order"
                                placeholder="Order"
                                min={1}
                                {...form.getInputProps('order')}
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

InsertPage.getLayout = (page) => <Layout>{page}</Layout>;
