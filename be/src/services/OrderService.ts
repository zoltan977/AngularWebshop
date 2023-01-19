import { OrderModelWithoutDateInterface } from "../DTO/AddOrderRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import OrderModel from "../models/order/order";

class OrderService {
  public async add(orderData: OrderModelWithoutDateInterface) {
      console.log("orderData:", orderData)

      let savedOrder
      try {
        const newOrder = new OrderModel({...orderData, dateCreated: new Date().getTime()});
        savedOrder = await newOrder.save();
    
      } catch (error) {
        console.log("Error creating Order: ", error);
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
    let orders

    try {
      orders = OrderModel.find({userEmail})
    } catch (error) {
      throw new DatabaseException();
    }

    return orders;
  }

  public async get(orderId: string) {
    let order

    try {
      order = OrderModel.findById(orderId)
    } catch (error) {
      throw new DatabaseException();
    }

    return order;
  }
}

export default OrderService;