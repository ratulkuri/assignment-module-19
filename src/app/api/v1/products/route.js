import { prisma } from "@/utility/prismaHelper";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc"
            },
            include: {
                productMeta: true,
                productReview: true
            }
        });
        // {
        //     by: ["userId"],
        //     _count: {id: true},
        //     _avg: {
        //         price: true,
        //         discount: true,
        //     },
        //     _sum: {
        //         price: true,
        //         discount: true,
        //     },
        //     _max: {
        //         price: true,
        //         discount: true,
        //     },
        // }

        return NextResponse.json({
            status: "success",
            data: products
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
        const {meta, ...productData} = reqBody;
        const product = await prisma.product.create({
            data: {
                ...productData,
                productMeta: {
                    create: meta
                }
            },
            include: {
                productMeta: true
            }
        });

        return NextResponse.json({
            status: "success",
            data: product
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "fail",
            data: error.toString()
        });
    }
}

export async function PUT(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('product_id');
        const reqBody = await req.json();
        const {meta, ...productData} = reqBody;
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                ...productData,
                productMeta: {
                    upsert: {
                        create: meta,
                        update: meta
                    }
                }
            },
            include: {
                productMeta: true
            }
        });

        return NextResponse.json({
            status: "success",
            data: product
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

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                productMeta: true,
                productReview: true
            }
        })

        if (product) {
            const productMetaTransaction = prisma.product_Meta.delete({
                where: {
                    id: product.productMeta.id
                }
            });
            const productReviewTransaction = prisma.product_Review.deleteMany({
                where: {
                    id: product.id
                }
            });

            const productTransaction = prisma.product.delete({
                where: {
                    id: product.id
                }
            });

            const results = await prisma.$transaction([
                productMetaTransaction,
                productReviewTransaction,
                productTransaction
            ])

            console.log("results =>", results)
            return NextResponse.json({ status: "Success", data: {
                productMeta: results[0],
                productReview: results[1],
                product: results[2]
            }});
        }

        return NextResponse.json({ status: "faile", data: "Product not found" });

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