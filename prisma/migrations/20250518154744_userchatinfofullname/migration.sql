/*
  Warnings:

  - Added the required column `FullName` to the `UserChatInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserChatInformation" ADD COLUMN     "FullName" TEXT NOT NULL;
