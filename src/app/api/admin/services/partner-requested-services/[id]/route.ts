import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Valid ID is required' }, { status: 400 });
    }

    try {
        await prisma.partnerRequestedService.delete({ where: { id } });
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting partner requested service:', error);
        return NextResponse.json({ message: 'Error deleting partner requested service' }, { status: 500 });
    }
}
