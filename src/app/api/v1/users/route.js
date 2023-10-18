import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({
            status: "success",
            data: users
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
        const user = await prisma.user.create({
            data: reqBody
        });

        return NextResponse.json({
            status: "success",
            data: user
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
        const userId = searchParams.get('id');
        const reqBody = await req.json();
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: reqBody
        });
        return NextResponse.json({ status: "Success", data: user });
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
        const userId = searchParams.get('id');
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        });

        console.log("user =>", user)
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