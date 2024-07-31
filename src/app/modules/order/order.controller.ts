import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";
import { get } from "http";

const getOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is crated successfully!!",
    data: result,
  });
});

export const OrderControllers = {
  getOrder,
};
