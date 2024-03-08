import { PrismaClient } from "@prisma/client";
import { HarvestLog } from "@prisma/client";

export function insertHarvestLogs(tx: any, harvestLogs: HarvestLog[]) {
  return Promise.all(
    harvestLogs.map((harvestLog) => {
      return tx.harvestLog.create({
        data: harvestLog,
      });
    })
  );
}
