CREATE TYPE "LeadStatus" AS ENUM (
  'NEW',
  'CONTACTED',
  'ESTIMATE_SCHEDULED',
  'WON',
  'LOST',
  'FOLLOW_UP_LATER'
);

CREATE TABLE "Lead" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "email" TEXT NOT NULL,
  "address" TEXT,
  "serviceType" TEXT NOT NULL,
  "projectDescription" TEXT,
  "preferredTimeline" TEXT,
  "budgetRange" TEXT,
  "referralName" TEXT,
  "referralContact" TEXT,
  "priority" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Booking" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "projectType" TEXT NOT NULL,
  "preferredDate" TIMESTAMP(3),
  "preferredTime" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Referral" (
  "id" SERIAL NOT NULL,
  "referrerName" TEXT NOT NULL,
  "referrerContact" TEXT NOT NULL,
  "referredName" TEXT NOT NULL,
  "referredContact" TEXT NOT NULL,
  "notes" TEXT,
  "interestedRecurring" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Image" (
  "id" SERIAL NOT NULL,
  "url" TEXT NOT NULL,
  "leadId" INTEGER NOT NULL,

  CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Image"
ADD CONSTRAINT "Image_leadId_fkey"
FOREIGN KEY ("leadId") REFERENCES "Lead"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
