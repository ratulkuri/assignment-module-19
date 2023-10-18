import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('product_id');
        const reqBody = await req.json();
        const productMeta = await prisma.product_Meta.update({
            where: {
                productId: productId
            },
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: productMeta
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "fail",
            data: error.toString()
        });
    }
}

export const DELETE = async (req, res) => {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('product_id');
        const productMeta = await prisma.product_Meta.delete({
            where: {
                productId: productId
            }
        });

        console.log("productMeta =>", productMeta)
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