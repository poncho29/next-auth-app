'use client';

import { signOut } from 'next-auth/react';

import { Button } from '../ui/button';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/auth/login' });
  }

  return (
    <Button onClick={handleLogout}>Salir</Button>
  )
}
