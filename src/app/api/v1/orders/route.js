import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const orders = await prisma.order.findMany();

        return NextResponse.json({
            status: "success",
            data: orders
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "fail",
            data: error.toString()
        });
    }
}

export async function POST(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const reqBody = await req.json();
        const order = await prisma.order.create({
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: order
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "fail",
            data: error.toString()
        });
    }
}

export const PUT = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');
        const reqBody = await req.json();
        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: reqBody
        });
        return NextResponse.json({ status: "Success", data: order });
    } catch (error) {
        let err = "";
        if (!error?.message) {
            err = error.toString();
        } else {
            err = error?.message;
        }
        return NextResponse.json({ status: "Fail", data: err });
    }
}

export const DELETE = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {

        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');
        const order = await prisma.order.delete({
            where: {
                id: orderId
            }
        });

        console.log("order =>", order)
        return NextResponse.json({ status: "Success" });
    } catch (error) {
        let err = "";
        console.log(error?.message);
        if (!error?.message) {
            err = error.toString();
        } else {
            err = error?.message;
        }
        return NextResponse.json({ status: "Fail", data: err });
    }
}