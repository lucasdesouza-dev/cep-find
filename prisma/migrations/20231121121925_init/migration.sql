-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confirmEmail" BOOLEAN NOT NULL DEFAULT false,
    "tenantUuid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "uuid" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tenantUuid" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tenantUuid_key" ON "User"("tenantUuid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantUuid_fkey" FOREIGN KEY ("tenantUuid") REFERENCES "Tenant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_tenantUuid_fkey" FOREIGN KEY ("tenantUuid") REFERENCES "Tenant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
