'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export function MemoList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error('メモの取得に失敗しました');
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotes();
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (notes.length === 0) {
    return <div>メモがありません</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="cursor-pointer hover:bg-accent/50">
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
              {new Date(note.createdAt).toLocaleDateString('ja-JP')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 