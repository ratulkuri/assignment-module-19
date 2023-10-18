import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const reviews = await prisma.product_Review.findMany();

        return NextResponse.json({
            status: "success",
            data: reviews
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
        const review = await prisma.product_Review.create({
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: review
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
        const reviewId = searchParams.get('id');
        const reqBody = await req.json();
        const review = await prisma.product_Review.update({
            where: {
                id: reviewId
            },
            data: reqBody
        });
        return NextResponse.json({ status: "Success", data: review });
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
        const reviewId = searchParams.get('id');
        const review = await prisma.product_Review.delete({
            where: {
                id: reviewId
            }
        });

        console.log("review =>", review)
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