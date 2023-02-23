/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `escorts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `client_email_key` ON `client`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `escorts_email_key` ON `escorts`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
