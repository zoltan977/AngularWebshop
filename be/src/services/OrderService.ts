import { AddOrderRequestInterface } from "../DTO/AddOrderRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import OrderModel from "../models/order/order";

class OrderService {
  public async add(orderData: AddOrderRequestInterface) {
      console.log("orderData:", orderData)

      let savedOrder
      try {
        const newOrder = new OrderModel(orderData);
        savedOrder = await newOrder.save();
    
      } catch (error) {
        console.log("Error creating Product: ", error);
        throw new DatabaseException();
      }
      
      return savedOrder;
  }
}

export default OrderService;