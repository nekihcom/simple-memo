'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/ui/icons';

export function CreateNote() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      toast.success('メモを作成しました');
      setContent('');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('メモの作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="新しいメモを入力"
              disabled={isLoading}
              required
              className="min-h-0 h-[38px] py-2"
            />
          </div>
          <Button type="submit" disabled={isLoading} size="sm">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            作成
          </Button>
        </div>
      </Card>
    </form>
  );
} 