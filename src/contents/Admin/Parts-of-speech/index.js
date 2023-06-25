import {
    ActionIcon,
    Badge,
    Button,
    Card,
    ColorInput,
    Container,
    Flex,
    Group,
    JsonInput,
    Kbd,
    Loader,
    NumberInput,
    Spoiler,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import React, { useCallback, useMemo, useState } from 'react';
import { useDidUpdate, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsOfSpeechApi from '@/libs/api/parts-of-speech';
import { notifications } from '@mantine/notifications';
import fn from '@/libs/fn';
import _ from 'lodash';
import { IconCircleXFilled } from '@tabler/icons-react';
import Editor from '@/components/Editor';
import { BackPageButton } from '@/components';

export default function PartsOfSpeechAdminPage() {
    const [filters, setFilters] = useState({
        code: '',
    });

    const { data, status, error, refetch } = useQuery({
        queryKey: ['searchPartsOfSpeech', filters],
        queryFn: () => partsOfSpeechApi.search(filters),
    });

    const { mutate: deletePartsOfSpeech } = useMutation({
        mutationKey: ['deletePartsOfSpeech'],
        mutationFn: ({ id }) => partsOfSpeechApi.delete({ id }),
        onSuccess: () => refetch(),
    });

    const items = useMemo(() => {
        return data?.data?.items || [];
    }, [data]);

    const total = useMemo(() => {
        return data?.data?.total || 0;
    }, [data]);

    const openModal = (data) => {
        modals.open({
            title: data ? 'Update Parts of Speech' : 'Add new Parts of Speech',
            size: 'lg',
            styles: (theme) => ({
                overlay: {
                    zIndex: 1002,
                },
                inner: {
                    zIndex: 1003,
                    [theme.fn.smallerThan('md')]: {
                        padding: '0 !important',
                    },
                },
                content: {
                    maxHeight: 'var(--window-height) !important',
                },
            }),
            centered: true,
            keepMounted: false,
            transitionProps: { duration: 200 },
            children: <Form total={total} data={data} />,
        });
    };

    return (
        <Container size="xl" py={24}>
            <Stack>
                <Flex justify="space-between">
                    <BackPageButton />
                    <Group noWrap>
                        <SearchInput
                            onSearch={({ search }) =>
                                setFilters((current) => ({
                                    ...current,
                                    code: search,
                                }))
                            }
                        />
                        <Button
                            variant="default"
                            leftIcon={<IconPlus />}
                            onClick={() => openModal()}
                        >
                            Add new
                        </Button>
                    </Group>
                </Flex>
                {status === 'loading' ? (
                    <Loader />
                ) : status === 'error' ? (
                    <Text>{error?.message || 'Error!'}</Text>
                ) : (
                    <Stack>
                        {items.map((item, index) => (
                            <CardItem
                                key={item?.id + index}
                                data={item}
                                onEdit={openModal}
                                onDelete={deletePartsOfSpeech}
                            />
                        ))}
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}

const CardItem = ({ data, onEdit, onDelete }) => {
    const openDeleteConfirmModal = () => {
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
            onCancel: () => console.log('Cancel'),
            onConfirm: () => onDelete({ id: data?.id }),
        });
    };

    return (
        <Card padding="md" radius="md" withBorder>
            <Group position="apart">
                <Title order={3}>{data?.word}</Title>
                <Group spacing={2}>
                    <Badge
                        sx={{
                            backgroundColor: data?.hexColor || '#f50',
                            color: 'white',
                        }}
                        variant="light"
                    >
                        {data?.code}
                    </Badge>
                    <Badge color="orange" variant="light">
                        {data?.order}
                    </Badge>
                </Group>
            </Group>

            <Editor
                toolbar={false}
                editable={false}
                content={JSON.parse(data?.description)}
            />
        </Card>
    );
};

const SearchInput = ({ onSearch }) => {
    const form = useForm({
        initialValues: {
            search: '',
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSearch)}>
            <TextInput
                icon={<IconSearch size={16} />}
                placeholder="Search Parts Of Speech"
                rightSection={
                    form.values.search ? (
                        <ActionIcon
                            size="xs"
                            opacity={0.6}
                            onClick={() => {
                                form.reset();
                                onSearch?.({ search: '' });
                            }}
                        >
                            <IconCircleXFilled />
                        </ActionIcon>
                    ) : null
                }
                {...form.getInputProps('search')}
            />
        </form>
    );
};

const Form = ({ total, data }) => {
    const [openedEditor, setOpenedEditor] = useState(false);
    const form = useForm({
        initialValues: {
            word: data?.word || '',
            code: data?.code || '',
            hexColor: data?.hexColor || '',
            translations: data?.translations || '',
            order: data?.order || total + 1,
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
            form.setFieldValue('code', fn.toSearch(val));
        }, 300),
        []
    );

    useDidUpdate(() => {
        throttleCode(form.values.word);
    }, [form.values.word]);

    const onSubmit = (value) => {
        if (data) {
            updatePartsOfSpeechMutate(
                { id: data?.id, ...value },
                {
                    onSuccess: (data) => {
                        notifications.show({
                            title: 'Update Parts Of Speech',
                            message: data?.message || 'Update success ',
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
                            title: 'Update Parts Of Speech',
                            message: err?.message || 'Update error',
                            color: 'red',
                            autoClose: 5000,
                        }),
                }
            );
        } else {
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
        }
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    withAsterisk
                    label="Word"
                    placeholder="Noun"
                    autoCapitalize="off"
                    {...form.getInputProps('word')}
                />
                <Group noWrap>
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
                </Group>
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
                {openedEditor ? (
                    <Editor
                        content=""
                        onUpdate={({ editor }) => {
                            form.setFieldValue(
                                'description',
                                JSON.stringify(editor.getJSON())
                            );
                        }}
                    />
                ) : (
                    <Textarea
                        minRows={3}
                        placeholder="Description"
                        onClick={() => setOpenedEditor(true)}
                    />
                )}
                <Group position="right">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => modals.closeAll()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="filled"
                        loading={insertLoading || updateLoading}
                    >
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};
