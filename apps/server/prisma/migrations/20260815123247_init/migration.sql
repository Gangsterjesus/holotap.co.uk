-- CreateTable
CREATE TABLE "merchant_fees" (
    "id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "percentage_fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fixed_fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "resource_fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_fees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "merchant_fees" ADD CONSTRAINT "merchant_fees_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "org_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
