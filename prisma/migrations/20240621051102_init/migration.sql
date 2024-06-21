-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "photoId" TEXT;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");

-- CreateIndex
CREATE INDEX "Message_photoId_idx" ON "Message"("photoId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
