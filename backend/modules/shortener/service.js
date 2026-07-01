import { ErrorResponse } from "../../shared/Errors/ErrorResponse.js"
import { ShortenerDto } from "./dto.js"

export const ServiceGetShortener = async (req) => {
  const {userID } = req.body
  if(!userID){
    throw new ErrorResponse(400, "needed userID")
  }
  return await ShortenerDto.getsByUsername(userID)
}