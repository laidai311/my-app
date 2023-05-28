import BaseLayout from '@/layouts/BaseLayout';
import { Button, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from '@mantine/form';

export default function AddDictionaryPage() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            word: '',
        },

        validate: {},
    });

    return (
        <div>
            <Button onClick={() => router.back()}>Back</Button>
            AddDictionaryPage
            <div className="">
                <form
                    onSubmit={form.onSubmit((val) => {
                        console.log(val);
                    })}
                >
                    <TextInput
                        required
                        label="Word"
                        placeholder="hello"
                        value={form.values.word}
                        onChange={(event) =>
                            form.setFieldValue(
                                'word',
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.word && 'Required'}
                        radius="md"
                    />
                </form>
            </div>
        </div>
    );
}

AddDictionaryPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
