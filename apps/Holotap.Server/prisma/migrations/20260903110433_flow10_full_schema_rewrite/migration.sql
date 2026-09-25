/*
  Warnings:

  - The primary key for the `identity_sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `identity_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `identity_sessions` table. All the data in the column will be lost.
  - Added the required column `actor_id` to the `identity_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risk_state` to the `identity_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `identity_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `identity_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "identity_sessions" DROP CONSTRAINT "identity_sessions_pkey",
DROP COLUMN "id",
DROP COLUMN "merchantId",
ADD COLUMN     "actor_id" TEXT NOT NULL,
ADD COLUMN     "badge_id" TEXT,
ADD COLUMN     "device_id" TEXT,
ADD COLUMN     "merchant_id" TEXT,
ADD COLUMN     "risk_state" TEXT NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "state" DROP DEFAULT,
ALTER COLUMN "created_at" DROP DEFAULT,
ADD CONSTRAINT "identity_sessions_pkey" PRIMARY KEY ("session_id");

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "identity_id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payments_identity_id_idx" ON "payments"("identity_id");

-- CreateIndex
CREATE INDEX "payments_merchant_id_idx" ON "payments"("merchant_id");

-- CreateIndex
CREATE INDEX "identity_sessions_actor_id_state_idx" ON "identity_sessions"("actor_id", "state");

-- CreateIndex
CREATE INDEX "identity_sessions_badge_id_device_id_merchant_id_idx" ON "identity_sessions"("badge_id", "device_id", "merchant_id");

-- CreateIndex
CREATE INDEX "identity_sessions_merchant_id_created_at_idx" ON "identity_sessions"("merchant_id", "created_at");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "identity_sessions"("session_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "org_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
