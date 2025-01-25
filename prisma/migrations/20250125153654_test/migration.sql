-- CreateEnum
CREATE TYPE "match_type" AS ENUM ('singles', 'doubles');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('upcoming', 'ongoing', 'finished');

-- CreateEnum
CREATE TYPE "status_enum" AS ENUM ('upcoming', 'ongoing', 'finished');

-- CreateEnum
CREATE TYPE "tournament_types" AS ENUM ('single_elimination', 'double_elimination', 'round_robin');

-- CreateTable
CREATE TABLE "match" (
    "id" UUID NOT NULL,
    "teams" UUID[],
    "winner" UUID,
    "tournament" UUID,
    "start_time" DATE,
    "scores" INTEGER[],
    "match_type" "match_type",

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "history" JSONB[],
    "cards" UUID[],
    "record" JSONB[],
    "elo" REAL[],

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "players" UUID[],

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament" (
    "id" UUID NOT NULL,
    "capacity" INTEGER,
    "players" UUID[],
    "matches" UUID[],
    "start_date" DATE,
    "end_date" DATE,
    "tournament_type" "tournament_types",
    "status" "status",

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);
