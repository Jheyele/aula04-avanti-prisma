/*
  Warnings:

  - Added the required column `isAdmin` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;
