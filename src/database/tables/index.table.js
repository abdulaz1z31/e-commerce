import {
  createUserTable,
  createAddressesTable,
  createSocialProfilesTable,
  createCategoriesTable,
  createProductsTable,
  createOtpTable
} from "./allTables.js";
import { logger } from "../../utils/index.utils.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createAddressesTable();
    await createSocialProfilesTable();
    await createCategoriesTable(),
    await createProductsTable()
    await createOtpTable()
    logger.info("All tables created successfully.");
  } catch (error) {
    logger.error(error.message); 
  }
};
