-- CreateTable
CREATE TABLE "public"."Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "nextWatering" TIMESTAMP(3),
    "token" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "public"."Plant"("name");
