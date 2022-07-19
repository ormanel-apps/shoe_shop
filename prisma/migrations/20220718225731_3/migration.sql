-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "images" TEXT NOT NULL
);
INSERT INTO "new_Products" ("brand", "description", "discount", "id", "images", "name", "price") SELECT "brand", "description", "discount", "id", "images", "name", "price" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
