import { AddOrderRequestInterface } from "../DTO/AddOrderRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import OrderModel from "../models/order/order";
import UserModel from "../models/user/user";

class OrderService {
  public async add(orderData: AddOrderRequestInterface) {
      console.log("orderData:", orderData)

      let savedOrder
      try {
        const newOrder = new OrderModel({...orderData, dateCreated: new Date().getTime()});
        savedOrder = await newOrder.save();
    
      } catch (error) {
        console.log("Error creating Product: ", error);
        throw new DatabaseException();
      }
      
      return savedOrder;
  }

  public async getAll() {
    let orders

    try {
      orders = OrderModel.find()
    } catch (error) {
      throw new DatabaseException();
    }

    return orders;
  }

  public async getAllByUser(userEmail: string) {
    let order

    try {
      order = OrderModel.find({userEmail})
    } catch (error) {
      throw new DatabaseException();
    }

    return order;
  }
}

export default OrderService;