import {logger} from "../utils/logger.js";


export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (data) => {
    try {
      return await this.dao.get(data);
    } catch (error) {
      logger.error(error);
    }
  };

  getProduct = async (product) => {
    try {
      return await this.dao.getBy(product);
    } catch (error) {
      logger.error(error);
    }
  };

  addProduct = async (product) => {
    try {
      return await this.dao.addProduct(product);
    } catch (error) {
      logger.error(error);
    }
  };

  updateProduct = async (id, updateBody) => {
    try {
      return await this.dao.update(id, updateBody);
    } catch (error) {
      logger.error(error);
    }
  };

  deleteProduct = async (pid) => {
    try {
      return await this.dao.delete(pid);
    } catch (error) {
      logger.error(error);
    }
  };
}
