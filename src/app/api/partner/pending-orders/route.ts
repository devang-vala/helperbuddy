import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const currentUTCTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized",
        timestamp: currentUTCTime
      }, { status: 401 });
    }

    // Get partner details
    const partner = await prisma.partner.findUnique({
      where: { email: session.user.email }
    });

    if (!partner) {
      return NextResponse.json({
        success: false,
        error: "Partner not found",
        timestamp: currentUTCTime
      }, { status: 404 });
    }

    // Get services this partner provides
    const serviceProviders = await prisma.serviceProvider.findMany({
      where: { partnerId: partner.id },
      select: { serviceId: true }
    });

    const serviceIds = serviceProviders.map(sp => sp.serviceId);

    console.log("Fetching orders for services:", serviceIds);

    // Get pending orders for these services
    const pendingOrders = await prisma.order.findMany({
      where: {
        serviceId: { in: serviceIds },
        status: 'PENDING',
        partnerId: null, // Not yet accepted by any partner
      },
      include: {
        service: {
          select: {
            name: true,
            price: true,
            category: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log("Found pending orders:", pendingOrders.length);

    return NextResponse.json({
      success: true,
      data: {
        orders: pendingOrders.map(order => ({
          ...order,
          createdAt: order.createdAt.toISOString(),
          updatedAt: order.updatedAt.toISOString(),
          date: order.date.toISOString()
        })),
        timestamp: currentUTCTime
      }
    });

  } catch (error) {
    const session = await getServerSession(authOptions);
    console.error("[Pending Orders Error]:", {
      error,
      timestamp: currentUTCTime,
      user: session?.user?.email
    });

    return NextResponse.json({
      success: false,
      error: "Failed to fetch pending orders",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: currentUTCTime
    }, { status: 500 });
  }
}