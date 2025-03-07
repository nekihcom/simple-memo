import { MemoForm } from '@/components/memo/memo-form';

export default function NewMemoPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">新規メモ作成</h1>
      <MemoForm />
    </main>
  );
} 