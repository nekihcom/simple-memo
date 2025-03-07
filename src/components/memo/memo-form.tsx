'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

type MemoFormData = {
  title: string;
  content: string;
};

type MemoFormProps = {
  onSuccess?: () => void;
};

export function MemoForm({ onSuccess }: MemoFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<MemoFormData>({
    title: '',
    content: '',
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('メモの作成に失敗しました');
      }

      toast({
        title: 'メモを作成しました',
        description: formData.title,
      });
      setFormData({ title: '', content: '' });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({
        title: 'エラーが発生しました',
        description: 'メモの作成に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="メモのタイトル"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">内容</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="メモの内容を入力してください"
          className="min-h-[200px]"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        保存
      </Button>
    </form>
  );
} 