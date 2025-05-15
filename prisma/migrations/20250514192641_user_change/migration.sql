/*
  Warnings:

  - You are about to drop the column `PasswordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `PasswordSalt` on the `User` table. All the data in the column will be lost.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "PasswordHash",
DROP COLUMN "PasswordSalt",
ADD COLUMN     "Password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Type" TEXT NOT NULL,
    "Provider" TEXT NOT NULL,
    "ProviderAccountId" TEXT NOT NULL,
    "RefreshToken" TEXT,
    "AccessToken" TEXT,
    "ExpiresAt" INTEGER,
    "TokenType" TEXT,
    "Scope" TEXT,
    "IdToken" TEXT,
    "SessionState" TEXT,

    CONSTRAINT "PK_Account" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Session" (
    "Id" TEXT NOT NULL,
    "SessionToken" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_Provider_ProviderAccountId_key" ON "Account"("Provider", "ProviderAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_SessionToken_key" ON "Session"("SessionToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
