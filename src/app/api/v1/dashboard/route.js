import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const ordersStatTransaction = prisma.order.aggregate({
            _avg: {
                discount: true,
                tax: true,
                grandTotal: true,
            },
            _sum: {
                discount: true,
                tax: true,
                grandTotal: true,
            },
            _max: {
                discount: true,
                grandTotal: true
            },
            _count: {
                id: true
            }
        });

        const usersStatTransaction = prisma.user.aggregate({
            _count: {
                id: true,
                admin: true
            }
        });

        const cartsStatTransaction = prisma.cart.groupBy({
            by: ["userId"],
            _count: {
                id: true
            }
        });

        const results = await prisma.$transaction([
            usersStatTransaction,
            cartsStatTransaction,
            ordersStatTransaction
        ]);

        return NextResponse.json({
            status: "success",
            data: {
                userStats: results[0],
                cartStats: results[1],
                orderStats: results[2]
            }
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "fail",
            data: error.toString()
        });
    }
}