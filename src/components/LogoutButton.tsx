'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      toast.success('ログアウトしました');
    } catch (error) {
      console.error(error);
      toast.error('ログアウトに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className="text-muted-foreground hover:text-foreground"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      ログアウト
    </Button>
  );
} 