import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const carts = await prisma.cart.findMany();

        return NextResponse.json({
            status: "success",
            data: carts
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
        const cart = await prisma.cart.create({
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: cart
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
        const cartId = searchParams.get('id');
        const reqBody = await req.json();
        const cart = await prisma.cart.update({
            where: {
                id: cartId
            },
            data: reqBody
        });
        return NextResponse.json({ status: "Success", data: cart });
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
        const cartId = searchParams.get('id');
        const cart = await prisma.cart.delete({
            where: {
                id: cartId
            }
        });

        console.log("cart =>", cart)
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