-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "FK_Messages_User_ModeratorId";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "FK_Messages_User_RecipientUserId";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "FK_Messages_User_SenderId";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "FK_Messages_User_UserId";

-- DropForeignKey
ALTER TABLE "ModeratorInOutHistories" DROP CONSTRAINT "FK_ModeratorInOutHistories_User_ModeratorUserId";

-- DropForeignKey
ALTER TABLE "UserLikes" DROP CONSTRAINT "FK_UserLikes_User_LikedUserId";

-- DropForeignKey
ALTER TABLE "UserLikes" DROP CONSTRAINT "FK_UserLikes_User_UserId";

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_ModeratorId" FOREIGN KEY ("ModeratorId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_RecipientUserId" FOREIGN KEY ("RecipientUserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_SenderId" FOREIGN KEY ("SenderId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ModeratorInOutHistories" ADD CONSTRAINT "FK_ModeratorInOutHistories_User_ModeratorUserId" FOREIGN KEY ("ModeratorUserId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_UserLikes_User_LikedUserId" FOREIGN KEY ("LikedUserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_UserLikes_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
