import {
  createUserTable,
  createAddressesTable,
  createSocialProfilesTable,
} from "./allTables.js";
import { logger } from "../../utils/index.utils.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createAddressesTable();
    await createSocialProfilesTable();
    logger.info("All tables created successfully.");
  } catch (error) {
    logger.error(error.message); 
  }
};
