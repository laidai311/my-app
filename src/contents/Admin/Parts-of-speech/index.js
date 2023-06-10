import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Collapse,
    ColorInput,
    Container,
    Group,
    JsonInput,
    Kbd,
    List,
    Loader,
    NumberInput,
    Spoiler,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Title,
} from '@mantine/core';
import {
    IconArrowDown,
    IconArrowUp,
    IconCircleCheck,
    IconSearch,
} from '@tabler/icons-react';
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

export default function PartsOfSpeechAdminPage() {
    const [filters, setFilters] = useState({
        code: '',
    });

    const { data, status, error } = useQuery({
        queryKey: ['searchPartsOfSpeech', filters],
        queryFn: () => partsOfSpeechApi.search(filters),
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
                <Group position="right" noWrap>
                    <SearchInput
                        onSearch={({ search }) =>
                            setFilters((current) => ({
                                ...current,
                                code: search,
                            }))
                        }
                    />
                    <Button
                        variant="gradient"
                        gradient={{ from: 'orange', to: 'red' }}
                        onClick={() => openModal()}
                    >
                        Add new
                    </Button>
                </Group>
                {status === 'loading' ? (
                    <Loader />
                ) : status === 'error' ? (
                    <Text>{error?.message || 'Error!'}</Text>
                ) : (
                    <Stack>
                        {items.map((item) => (
                            <CardItem
                                key={item?.id}
                                data={item}
                                onEdit={openModal}
                            />
                        ))}
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}

const FieldJson = (val) => {
    return JSON.parse(val).map((item) => (
        <Spoiler fz="sm" maxHeight={43} showLabel="Show more" hideLabel="Hide">
            {Object.entries(item).map((it) => (
                <Text size="sm">
                    <Kbd size="xs" mr={5}>
                        EN
                    </Kbd>
                    <Text display="inline">{it[0]}</Text>
                    <Kbd size="xs" mx={5}>
                        VN
                    </Kbd>
                    <Text display="inline" color="dimmed">
                        {it[1]}
                    </Text>
                </Text>
            ))}
        </Spoiler>
    ));
};

const CardItem = ({ data, onEdit }) => {
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
            onConfirm: () => console.log('Confirmed'),
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

            <List
                mt="md"
                spacing="xs"
                size="sm"
                icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck size="1rem" />
                    </ThemeIcon>
                }
            >
                <List.Item>
                    <Stack spacing={5}>
                        <Title order={6} weight={600}>
                            Definitions
                        </Title>
                        {FieldJson(data?.definitions)}
                    </Stack>
                </List.Item>
                <List.Item>
                    <Stack spacing={5}>
                        <Title order={6} weight={600}>
                            Function or 'job'
                        </Title>
                        {FieldJson(data?.function_or_job)}
                    </Stack>
                </List.Item>
                <List.Item>
                    <Stack spacing={5}>
                        <Title order={6} weight={600}>
                            Example sentences
                        </Title>
                        {FieldJson(data?.example_sentences)}
                    </Stack>
                </List.Item>
                <List.Item>
                    <Stack spacing={5}>
                        <Title order={6} weight={600}>
                            Example words
                        </Title>
                        {FieldJson(data?.example_words)}
                    </Stack>
                </List.Item>
            </List>

            <Group noWrap position="right" mt="md">
                <Button
                    variant="subtle"
                    color="red"
                    radius="md"
                    onClick={openDeleteConfirmModal}
                >
                    Delete
                </Button>
                <Button radius="md" onClick={() => onEdit?.(data)}>
                    Edit
                </Button>
            </Group>
        </Card>
    );
};

const SearchInput = ({ onSearch }) => {
    const matches = useMediaQuery('(max-width: 768px)', false);
    const form = useForm({
        initialValues: {
            search: '',
        },
    });

    return (
        <form
            style={{ flexGrow: matches ? 1 : 0 }}
            onSubmit={form.onSubmit(onSearch)}
        >
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
    const [opened, { toggle }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            word: data?.word || '',
            code: data?.code || '',
            hexColor: data?.hexColor || '',
            translations: data?.translations || '',
            definitions: data?.definitions || '',
            function_or_job: data?.function_or_job || '',
            example_words: data?.example_words || '',
            example_sentences: data?.example_sentences || '',
            order: data?.order || total + 1,
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
                <Collapse in={opened}>
                    <Stack>
                        <ArrayJsonInput
                            form={form}
                            path="definitions"
                            label="Definitions"
                            placeholder={JSON.stringify(
                                [{ Noun: 'DanhTừ' }],
                                null,
                                2
                            )}
                            {...form.getInputProps('definitions')}
                        />
                        <ArrayJsonInput
                            form={form}
                            path="function_or_job"
                            label="Function or 'job'"
                            placeholder={JSON.stringify(
                                [{ Action: 'Hành động' }],
                                null,
                                2
                            )}
                            {...form.getInputProps('function_or_job')}
                        />
                        <ArrayJsonInput
                            form={form}
                            path="example_words"
                            label="Example words"
                            placeholder={JSON.stringify(
                                [{ be: 'Thì, là, ở,...' }],
                                null,
                                2
                            )}
                            {...form.getInputProps('example_words')}
                        />
                        <ArrayJsonInput
                            form={form}
                            path="example_sentences"
                            label="Example sentences"
                            placeholder={JSON.stringify(
                                [
                                    {
                                        'I like EnglishClub':
                                            'Tôi thích EnglishClub',
                                    },
                                ],
                                null,
                                2
                            )}
                            {...form.getInputProps('example_sentences')}
                        />
                    </Stack>
                </Collapse>
                <Group position="right">
                    <Button
                        size="sm"
                        variant="subtle"
                        rightIcon={opened ? <IconArrowUp /> : <IconArrowDown />}
                        onClick={toggle}
                    >
                        Options
                    </Button>
                </Group>
                <NumberInput
                    required
                    label="Order"
                    placeholder="Order"
                    min={1}
                    {...form.getInputProps('order')}
                />
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

const incrementArrayJson = (value) => {
    if (typeof value !== 'string') return value;

    let arr = [];
    try {
        arr = JSON.parse(value);
    } catch (e) {
    } finally {
        arr.push({ English: 'Vietnamese' });
    }

    return JSON.stringify(arr, null, 2);
};

const decrementArrayJson = (value) => {
    if (typeof value !== 'string') return value;

    let arr = [];
    try {
        arr = JSON.parse(value);
    } catch (e) {
    } finally {
        arr.pop();
    }

    return JSON.stringify(arr, null, 2);
};

const ArrayJsonInput = ({ form, path, ...others }) => {
    return (
        <Stack spacing={6}>
            <JsonInput
                autoCapitalize="off"
                validationError="Invalid JSON"
                formatOnBlur
                autosize
                minRows={5}
                spellCheck="false"
                {...others}
            />
            <Button.Group>
                <Button
                    size="xs"
                    variant="default"
                    onClick={() => {
                        form.setFieldValue(
                            path,
                            incrementArrayJson(form.values?.[path])
                        );
                    }}
                >
                    Increment
                </Button>
                <Button
                    size="xs"
                    variant="default"
                    disabled={!form.values?.[path]}
                    onClick={() => {
                        form.setFieldValue(
                            path,
                            decrementArrayJson(form.values?.[path])
                        );
                    }}
                >
                    Decrement
                </Button>
            </Button.Group>
        </Stack>
    );
};
