'use client';

import { Box, Button, Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export function Navbar() {
  return (
    <Box className="border-b border-[--border] bg-[--background]">
      <Container size="4">
        <Flex justify="between" align="center" py="4">
          <Flex align="center" gap="6">
            <Link href="/" className="text-xl font-semibold text-[--foreground]">
              Verifio
            </Link>
            <Flex gap="6">
              <Link href="#features" className="text-[--muted-foreground] hover:text-[--foreground] text-sm">
                Fonctionnalités
              </Link>
              <Link href="/docs" className="text-[--muted-foreground] hover:text-[--foreground] text-sm">
                Documentation
              </Link>
            </Flex>
          </Flex>
          <Flex gap="4" align="center">
            <ThemeSwitcher />
            <Button variant="soft" asChild>
              <Link href="/dashboard">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Essai gratuit</Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 