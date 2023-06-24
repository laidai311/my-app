import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { BackPageButton, Editor, Layout } from '@/components';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import _ from 'lodash';
import fn from '@/libs/fn';
import { useDidUpdate } from '@mantine/hooks';
import {
    Button,
    Center,
    ColorInput,
    Flex,
    Group,
    LoadingOverlay,
    NumberInput,
    Paper,
    Stack,
    TextInput,
    Textarea,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

export default function InsertPage({ total, data }) {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            word: data?.word || '',
            code: data?.code || '',
            hexColor: data?.hexColor || '',
            translations: data?.translations || '',
            order: router.query?.total ? +router.query?.total + 1 : 1,
            definitions: data?.definitions || '',
            description: data?.description || '',
        },

        validate: {
            word: (value) => (value ? null : 'Invalid word'),
            code: (value) => (value ? null : 'Invalid code'),
            translations: (value) => (value ? null : 'Invalid translation'),
        },
    });

    const queryClient = useQueryClient();

    const { mutate: insertPartsOfSpeechMutate, isLoading: insertLoading } =
        useMutation({
            mutationFn: (data) => partsOfSpeechApi.insert(data),
            mutationKey: ['insertPartsOfSpeech'],
        });

    const { mutate: updatePartsOfSpeechMutate, isLoading: updateLoading } =
        useMutation({
            mutationFn: (data) => partsOfSpeechApi.update(data),
            mutationKey: ['updatePartsOfSpeech'],
        });

    const throttleCode = useCallback(
        _.throttle((val) => {
            form.setFieldValue('code', fn.toCode(val));
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
                    autoClose: 5000,
                });
                queryClient.refetchQueries({
                    queryKey: ['searchPartsOfSpeech'],
                });
                modals.closeAll();
            },
            onError: (err) =>
                notifications.show({
                    title: 'Insert Parts Of Speech',
                    message: err?.message || 'Insert error',
                    color: 'red',
                    autoClose: 5000,
                }),
        });
    };

    return (
        <>
            <Head>
                <title>Insert Parts of speech</title>
            </Head>

            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
                </Flex>

                <LoadingOverlay visible={insertLoading} />

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Word"
                            placeholder="Noun"
                            autoCapitalize="off"
                            {...form.getInputProps('word')}
                        />
                        <TextInput
                            withAsterisk
                            w={'100%'}
                            label="Code"
                            placeholder="noun"
                            autoCapitalize="off"
                            {...form.getInputProps('code')}
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
                            label="Translations"
                            placeholder="Danh từ"
                            autoCapitalize="off"
                            {...form.getInputProps('translations')}
                        />
                        <NumberInput
                            required
                            label="Order"
                            placeholder="Order"
                            min={1}
                            {...form.getInputProps('order')}
                        />
                        <TextInput
                            sx={{ display: 'none' }}
                            {...form.getInputProps('description')}
                        />
                        <Editor
                            content=""
                            onUpdate={({ editor }) => {
                                form.setFieldValue(
                                    'description',
                                    JSON.stringify(editor.getJSON())
                                );
                            }}
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
