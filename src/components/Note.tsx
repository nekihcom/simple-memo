'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/ui/icons';

interface NoteProps {
  id: string;
  content: string;
}

export function Note({ id, content: initialContent }: NoteProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 編集モード開始時にテキストエリアにフォーカス
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    // 外側クリックで保存する処理
    function handleClickOutside(event: MouseEvent) {
      if (
        isEditing &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, content]);

  const handleSave = async () => {
    if (content === initialContent) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      toast.success('メモを更新しました');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('メモの更新に失敗しました');
      setContent(initialContent);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('このメモを削除してもよろしいですか？')) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      toast.success('メモを削除しました');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('メモの削除に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <div 
          ref={wrapperRef}
          className="flex-1 min-w-0"
          onClick={() => !isEditing && !isLoading && setIsEditing(true)}
        >
          {isEditing ? (
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="メモを入力"
              disabled={isLoading}
              required
              className="min-h-0 h-[38px] py-2"
            />
          ) : (
            <p className="truncate cursor-pointer hover:text-muted-foreground">
              {content}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isLoading}
          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          <span className="sr-only">削除</span>
        </Button>
      </div>
    </Card>
  );
} 