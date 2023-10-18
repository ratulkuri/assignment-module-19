import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json({
            status: "success",
            data: categories
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
        const category = await prisma.category.create({
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: category
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
        const categoryId = searchParams.get('id');
        const reqBody = await req.json();
        const category = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: reqBody
        });
        return NextResponse.json({ status: "Success", data: category });
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
        const categoryId = searchParams.get('id');
        const category = await prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        console.log("category =>", category)
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