import { consumerService } from "../services/consumer.service.js";
import { sendSuccess } from "../utils/response.js";

export function createConsumer(req, res, next) {
  try {
    const consumer = consumerService.createConsumer(req.body);
    return sendSuccess(res, 201, "Consumer created", consumer);
  } catch (err) {
    next(err);
  }
}
