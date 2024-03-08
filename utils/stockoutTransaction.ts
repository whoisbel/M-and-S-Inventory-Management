import { Stockout, StockOutType } from "@prisma/client";

export async function createStockout(tx: any, stockout: Stockout) {
  // 1. Find the relevant stock record using a more concise query
  const stock = await tx.stock.findFirst({
    where: { gradeId: stockout.gradeId, isWashed: stockout.washed },
  });

  // 2. Check if stock is available before updating
  if (!stock || stock.quantityOnHand < stockout.quantity) {
    throw new Error(
      `Insufficient stock for grade ${stockout.gradeId} (washed: ${stockout.washed})`
    );
  }

  // 3. Update stock quantity efficiently
  await tx.stock.update({
    where: { id: stock.id },
    data: { quantityOnHand: { decrement: stockout.quantity } },
  });

  // 4. Create the stockout entry
  await tx.stockout.create({
    data: {
      quantity: stockout.quantity,
      stockId: stock.id,
      stockoutType: StockOutType.disposed, // Or use the appropriate type
    },
  });
  const inventory = await tx.inventory.findUnique({
    where: { id: stockout.inventoryId },
    select: {
      grade: {
        select: {
          description: true,
        },
      },
    },
  });
  if (inventory.grade.description.toLowerCase() == "ungraded") {
    await tx.inventory.update({
      where: { id: stockout.inventoryId },
      data: {
        quantity: {
          decrement: stockout.quantity,
        },
      },
    });
  }
}
