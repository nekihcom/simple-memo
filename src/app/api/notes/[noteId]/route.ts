import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth-helper';
import { prisma } from '@/lib/prisma';

// メモの取得
export async function GET(
  request: NextRequest,
  context: { params: { noteId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const note = await prisma.note.findUnique({
      where: {
        id: context.params.noteId,
        userId: session.user.id,
      },
    });

    if (!note) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('[NOTE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// メモの更新
export async function PATCH(
  request: NextRequest,
  context: { params: { noteId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await request.json();
    const { content } = json;

    if (!content) {
      return new NextResponse('Content is required', { status: 400 });
    }

    const note = await prisma.note.update({
      where: {
        id: context.params.noteId,
        userId: session.user.id,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error('[NOTE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// メモの削除
export async function DELETE(
  request: NextRequest,
  context: { params: { noteId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.note.delete({
      where: {
        id: context.params.noteId,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[NOTE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 