-- CreateTable
CREATE TABLE "ChatNote" (
    "Id" SERIAL NOT NULL,
    "Note" TEXT NOT NULL,
    "ChatId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_ChatNote" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "RecipientUserId" INTEGER NOT NULL DEFAULT 0,
    "SenderUserId" INTEGER NOT NULL DEFAULT 0,
    "ModeratorId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_Chats" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CoinTransaction" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "TransactionType" INTEGER NOT NULL,
    "Amount" REAL NOT NULL,
    "Description" TEXT,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "Credit" INTEGER NOT NULL DEFAULT 0,
    "UserImagesID" INTEGER,

    CONSTRAINT "PK_CoinTransaction" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Coins" (
    "Id" SERIAL NOT NULL,
    "Credits" INTEGER NOT NULL,
    "Price" REAL NOT NULL,
    "Image" TEXT NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "Color" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PK_Coins" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Dream" (
    "Id" SERIAL NOT NULL,
    "Content" TEXT,
    "Interpretation" TEXT,
    "TimeSpeed" INTEGER NOT NULL,
    "ViewingTime" TIMESTAMPTZ(6) NOT NULL,
    "IsShowNotification" BOOLEAN NOT NULL,
    "IsShowRead" BOOLEAN NOT NULL,
    "IsSave" BOOLEAN NOT NULL,
    "UserId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_Dream" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Friendships" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "FriendId" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "RequestedAt" TIMESTAMPTZ(6) NOT NULL,
    "AcceptedAt" TIMESTAMPTZ(6),
    "UserImagesId" INTEGER,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_Friendships" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "Id" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "Timestamp" TIMESTAMPTZ(6) NOT NULL,
    "SenderId" INTEGER NOT NULL,
    "ChatId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "IsSeen" BOOLEAN NOT NULL DEFAULT false,
    "RecipientUserId" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER,
    "ModeratorId" INTEGER,

    CONSTRAINT "PK_Messages" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ModeratorInOutHistories" (
    "Id" SERIAL NOT NULL,
    "ModeratorId" INTEGER,
    "ModeratorUserId" INTEGER,
    "MessageId" INTEGER NOT NULL,
    "In" BOOLEAN NOT NULL,
    "Out" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_ModeratorInOutHistories" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "Id" SERIAL NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_Settings" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PasswordSalt" BYTEA NOT NULL,
    "PasswordHash" BYTEA NOT NULL,
    "UserType" INTEGER NOT NULL,
    "Gender" INTEGER,
    "DateOfBirth" TIMESTAMPTZ(6),
    "DateOfBirthTime" TEXT,
    "PlaceOfBirth" TEXT,
    "MaritalStatus" INTEGER,
    "SexualOrientation" INTEGER,
    "BirthDay" TEXT,
    "BirthMonth" TEXT,
    "BirthYear" TEXT,
    "About" TEXT,
    "Location" TEXT,
    "ProfileImage" TEXT,
    "IsVerify" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "BodyType" TEXT,
    "Education" TEXT,
    "Ethnicity" TEXT,
    "Height" TEXT,
    "Job" TEXT,
    "Religion" TEXT,
    "IsSmoke" BOOLEAN,
    "NumberOfChildren" INTEGER NOT NULL DEFAULT 0,
    "ConnectionId" TEXT,
    "IsOnline" BOOLEAN NOT NULL DEFAULT false,
    "Coin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_User" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserChatInformation" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ChatId" INTEGER NOT NULL,
    "Relationship" TEXT NOT NULL,
    "Birthday" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Profession" TEXT NOT NULL,
    "Hobbies" TEXT NOT NULL,
    "Infos" TEXT NOT NULL,

    CONSTRAINT "PK_UserChatInformation" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserChatRooms" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ChatId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "PK_UserChatRooms" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserImages" (
    "Id" SERIAL NOT NULL,
    "ThumbImageUrl" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "IsProfile" BOOLEAN NOT NULL,
    "UserId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "isSecureImage" BOOLEAN NOT NULL DEFAULT false,
    "IsSpecial" BOOLEAN NOT NULL DEFAULT false,
    "SpecialUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PK_UserImages" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserLikes" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "LikedUserId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6),
    "IsDeleted" BOOLEAN NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "IsSeen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_UserLikes" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserTokens" (
    "Token" TEXT NOT NULL,
    "TokenType" INTEGER NOT NULL,
    "ValidUntil" TIMESTAMPTZ(6) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Id" TEXT,

    CONSTRAINT "PK_UserTokens" PRIMARY KEY ("Token")
);

-- CreateTable
CREATE TABLE "__EFMigrationsHistory" (
    "MigrationId" VARCHAR(150) NOT NULL,
    "ProductVersion" VARCHAR(32) NOT NULL,

    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

-- CreateIndex
CREATE INDEX "IX_ChatNote_ChatId" ON "ChatNote"("ChatId");

-- CreateIndex
CREATE INDEX "IX_ChatNote_UserId" ON "ChatNote"("UserId");

-- CreateIndex
CREATE INDEX "IX_Chats_RecipientUserId" ON "Chats"("RecipientUserId");

-- CreateIndex
CREATE INDEX "IX_Chats_SenderUserId" ON "Chats"("SenderUserId");

-- CreateIndex
CREATE INDEX "IX_CoinTransaction_UserId" ON "CoinTransaction"("UserId");

-- CreateIndex
CREATE INDEX "IX_Dream_UserId" ON "Dream"("UserId");

-- CreateIndex
CREATE INDEX "IX_Friendships_UserId" ON "Friendships"("UserId");

-- CreateIndex
CREATE INDEX "IX_Friendships_UserImagesId" ON "Friendships"("UserImagesId");

-- CreateIndex
CREATE INDEX "IX_Messages_ChatId" ON "Messages"("ChatId");

-- CreateIndex
CREATE INDEX "IX_Messages_ModeratorId" ON "Messages"("ModeratorId");

-- CreateIndex
CREATE INDEX "IX_Messages_RecipientUserId" ON "Messages"("RecipientUserId");

-- CreateIndex
CREATE INDEX "IX_Messages_SenderId" ON "Messages"("SenderId");

-- CreateIndex
CREATE INDEX "IX_Messages_UserId" ON "Messages"("UserId");

-- CreateIndex
CREATE INDEX "IX_ModeratorInOutHistories_MessageId" ON "ModeratorInOutHistories"("MessageId");

-- CreateIndex
CREATE INDEX "IX_ModeratorInOutHistories_ModeratorUserId" ON "ModeratorInOutHistories"("ModeratorUserId");

-- CreateIndex
CREATE UNIQUE INDEX "IX_User_UserName" ON "User"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "IX_User_Email" ON "User"("Email");

-- CreateIndex
CREATE INDEX "IX_UserChatRooms_ChatId" ON "UserChatRooms"("ChatId");

-- CreateIndex
CREATE INDEX "IX_UserChatRooms_UserId" ON "UserChatRooms"("UserId");

-- CreateIndex
CREATE INDEX "IX_UserImages_UserId" ON "UserImages"("UserId");

-- CreateIndex
CREATE INDEX "IX_UserLikes_LikedUserId" ON "UserLikes"("LikedUserId");

-- CreateIndex
CREATE INDEX "IX_UserLikes_UserId" ON "UserLikes"("UserId");

-- CreateIndex
CREATE INDEX "IX_UserTokens_UserId" ON "UserTokens"("UserId");

-- AddForeignKey
ALTER TABLE "ChatNote" ADD CONSTRAINT "FK_ChatNote_Chats_ChatId" FOREIGN KEY ("ChatId") REFERENCES "Chats"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatNote" ADD CONSTRAINT "FK_ChatNote_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "FK_Chats_User_RecipientUserId" FOREIGN KEY ("RecipientUserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "FK_Chats_User_SenderUserId" FOREIGN KEY ("SenderUserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CoinTransaction" ADD CONSTRAINT "FK_CoinTransaction_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "FK_Dream_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "FK_Friendships_UserImages_UserImagesId" FOREIGN KEY ("UserImagesId") REFERENCES "UserImages"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "FK_Friendships_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_Chats_ChatId" FOREIGN KEY ("ChatId") REFERENCES "Chats"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_ModeratorId" FOREIGN KEY ("ModeratorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_RecipientUserId" FOREIGN KEY ("RecipientUserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_SenderId" FOREIGN KEY ("SenderId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "FK_Messages_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ModeratorInOutHistories" ADD CONSTRAINT "FK_ModeratorInOutHistories_Messages_MessageId" FOREIGN KEY ("MessageId") REFERENCES "Messages"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ModeratorInOutHistories" ADD CONSTRAINT "FK_ModeratorInOutHistories_User_ModeratorUserId" FOREIGN KEY ("ModeratorUserId") REFERENCES "User"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserChatInformation" ADD CONSTRAINT "FK_UserChatInformation_ChatId" FOREIGN KEY ("ChatId") REFERENCES "Chats"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserChatInformation" ADD CONSTRAINT "FK_UserChatInformation_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserChatRooms" ADD CONSTRAINT "FK_UserChatRooms_Chats_ChatId" FOREIGN KEY ("ChatId") REFERENCES "Chats"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserChatRooms" ADD CONSTRAINT "FK_UserChatRooms_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserImages" ADD CONSTRAINT "FK_UserImages_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_UserLikes_User_LikedUserId" FOREIGN KEY ("LikedUserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_UserLikes_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "FK_UserTokens_User_UserId" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
