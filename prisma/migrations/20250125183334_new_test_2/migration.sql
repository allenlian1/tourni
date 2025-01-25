/*
  Warnings:

  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "match";

-- DropTable
DROP TABLE "profile";

-- DropTable
DROP TABLE "team";

-- DropTable
DROP TABLE "tournament";

-- DropEnum
DROP TYPE "match_type";

-- DropEnum
DROP TYPE "status";

-- DropEnum
DROP TYPE "status_enum";

-- DropEnum
DROP TYPE "tournament_types";
