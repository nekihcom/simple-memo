'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // TODO: 会員登録処理を実装
      router.push('/memos');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              placeholder="山田 太郎"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            アカウントを作成
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            または
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        <Icons.google className="mr-2 h-4 w-4" />
        Googleで登録
      </Button>
    </div>
  );
} 