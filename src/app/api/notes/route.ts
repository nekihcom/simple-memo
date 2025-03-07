import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth-helper';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('[NOTES_GET]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const { content } = json;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error('[NOTES_POST]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 