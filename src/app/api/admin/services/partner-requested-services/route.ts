import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const status = 'PENDING';

        const services = await prisma.$queryRaw`SELECT * FROM "PartnerRequestedService" WHERE status = 'PENDING' ORDER BY id DESC`;

        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        console.error('Error fetching PartnerRequestedService:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const validStatuses = ['PENDING', 'CANCELLED', 'COMPLETED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedRequest = await prisma.partnerRequestedService.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json({
            message: 'Status updated successfully',
            updatedRequest
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
