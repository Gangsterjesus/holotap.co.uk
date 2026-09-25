-- CreateTable
CREATE TABLE "ledger_records" (
    "id" BIGSERIAL NOT NULL,
    "flow" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "session_id" TEXT,
    "actor_type" TEXT NOT NULL,
    "actor_id" TEXT,
    "correlation_id" TEXT NOT NULL,
    "envelope" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ledger_records_session_id_idx" ON "ledger_records"("session_id");

-- CreateIndex
CREATE INDEX "ledger_records_actor_id_idx" ON "ledger_records"("actor_id");

-- CreateIndex
CREATE INDEX "ledger_records_flow_idx" ON "ledger_records"("flow");

-- CreateIndex
CREATE INDEX "ledger_records_event_type_idx" ON "ledger_records"("event_type");
