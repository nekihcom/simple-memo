import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">会員登録</h1>
          <p className="text-muted-foreground mt-2">新しいアカウントを作成してください</p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
} 