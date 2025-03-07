import { auth } from '@/lib/auth-helper';
import { prisma } from '@/lib/prisma';
import { Note } from '@/components/Note';
import { CreateNote } from '@/components/CreateNote';
import { LoginForm } from '@/components/auth/login-form';
import { LogoutButton } from '@/components/LogoutButton';

type Note = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default async function HomePage() {
  const session = await auth();

  // 未認証の場合はログインフォームを表示
  if (!session?.user?.id) {
    return (
      <main className="container max-w-3xl mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">メモアプリ</h1>
            <p className="text-muted-foreground">
              ログインしてメモを管理しましょう
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    );
  }

  // 認証済みの場合はメモ一覧を表示
  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="container max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">メモ一覧</h1>
        <LogoutButton />
      </div>
      <CreateNote />
      <div className="space-y-2">
        {notes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            まだメモは作成されていません。
          </p>
        ) : (
          notes.map((note: Note) => (
            <Note
              key={note.id}
              id={note.id}
              content={note.content}
            />
          ))
        )}
      </div>
    </main>
  );
}
