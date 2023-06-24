import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackPageButton(props) {
    const router = useRouter();

    return (
        <Button
            {...props}
            variant="default"
            onClick={() => router.back()}
            leftIcon={<IconArrowLeft />}
        >
            Back
        </Button>
    );
}
