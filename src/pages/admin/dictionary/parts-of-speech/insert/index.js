import React, { useCallback } from 'react';
import Head from 'next/head';
import { BackPageButton, Editor, Layout } from '@/components';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import dictionaryApi from '@/libs/api/dictionary';
import _ from 'lodash';
import fn from '@/libs/fn';
import { useDidUpdate } from '@mantine/hooks';
import {
    ActionIcon,
    Button,
    Center,
    ColorInput,
    Flex,
    LoadingOverlay,
    NumberInput,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconFocus } from '@tabler/icons-react';

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
            translation: (value) => (value ? null : 'Invalid translation'),
        },
    });

    const { mutate: insertPartsOfSpeechMutate, isLoading: insertLoading } =
        useMutation({
            mutationFn: (data) => partsOfSpeechApi.insert(data),
            mutationKey: ['insertPartsOfSpeech'],
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
        insertPartsOfSpeechMutate(value, {
            onSuccess: (data) => {
                notifications.show({
                    title: 'Insert Parts Of Speech',
                    message: data?.message || 'Insert success',
                    color: 'green',
                    autoClose: 5 * 1000,
                });
                queryClient.resetQueries({
                    queryKey: ['searchPartsOfSpeech'],
                });
                router.back();
            },
            onError: (err) =>
                notifications.show({
                    title: 'Insert Parts Of Speech',
                    message: err?.message || 'Insert error',
                    color: 'red',
                    autoClose: 5 * 1000,
                }),
        });
    };

    const {
        mutate: searchDictionaryApi,
        isLoading: searchDictionaryApiIsLoading,
    } = useMutation({
        mutationFn: (word) => dictionaryApi.search(word),
        mutationKey: ['searchDictionaryApi'],
    });

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
