import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password, name } = json;

    if (!email) {
      return new NextResponse('メールアドレスは必須です', { status: 400 });
    }

    if (!password) {
      return new NextResponse('パスワードは必須です', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse('このメールアドレスは既に使用されています', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('[REGISTER_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 