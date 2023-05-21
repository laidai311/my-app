import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Center,
    useNo,
    Progress,
} from '@mantine/core';
import NextLink from 'next/link';
import { useAuth } from '@/components/AuthFirebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function AuthenticationForm(props) {
    const [isReady, setIsReady] = useState();
    const { data: user, signInApp } = useAuth();
    const router = useRouter();
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val)
                    ? null
                    : 'Invalid email',
            password: (val) =>
                val.length <= 6
                    ? 'Password should include at least 6 characters'
                    : null,
        },
    });

    useEffect(() => {
        router.prefetch('/');
    }, [router]);

    useEffect(() => {
        if (user) {
            router.push('/');
        } else {
            setIsReady(true);
        }
    }, []);

    const { mutate: signInMutate, isLoading } = useMutation({
        mutationKey: ['signIn'],
        mutationFn: (val) => signInApp(val),
    });

    const strength = getStrength(form.values.password);
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                    form.values.password.length > 0 && index === 0
                        ? 100
                        : strength >= ((index + 1) / 4) * 100
                        ? 100
                        : 0
                }
                color={
                    strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'
                }
                key={index}
                size={4}
            />
        ));

    if (!isReady) {
        return null;
    }

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Center>
                <Text size="lg" weight={500}>
                    Welcome to{' '}
                    <NextLink
                        href="/"
                        passHref
                        style={{ textDecoration: 'unset', color: 'inherit' }}
                    >
                        dailai9966
                    </NextLink>
                </Text>
            </Center>

            <Divider
                label={
                    type === 'register'
                        ? 'Register with email'
                        : 'Continue with email'
                }
                labelPosition="center"
                my="lg"
            />

            <form
                onSubmit={form.onSubmit((val) => {
                    signInMutate(
                        {
                            email: val.email,
                            password: val.password,
                        },
                        {
                            onSuccess: () => router.push('/'),
                            onError: (err) =>
                                notifications.show({
                                    title: 'Login Error',
                                    message: err?.message || '' + '🤥',
                                }),
                        }
                    );
                })}
            >
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'name',
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@dailai.dev"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                'email',
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                'password',
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            'Password should include at least 6 characters'
                        }
                        radius="md"
                    />
                    <Group spacing={5} grow px={3}>
                        {bars}
                    </Group>

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'terms',
                                    event.currentTarget.checked
                                )
                            }
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" loading={isLoading}>
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
