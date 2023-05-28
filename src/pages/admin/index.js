import React from 'react'
import NextLink from 'next/link'
import { Anchor } from '@mantine/core'

export default function AdminPage() {
  return (
    <div>AdminPage

        <NextLink href='/admin/data' passHref>
            <Anchor>Data</Anchor>
        </NextLink>
    </div>
  )
}
