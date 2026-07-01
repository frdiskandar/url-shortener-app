import express from "express"
import { ErrorResponse } from "../../shared/Errors/ErrorResponse.js";
import { UserDto } from "./dto.js";

const UserRoute = express.Router()

UserRoute.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      throw new ErrorResponse(400, "need username");
    }
    let user = await UserDto.index(username);
    if (user.rows[0]) {
      throw new ErrorResponse(400, "username already exsist!!")
    }

    user = await UserDto.create(username);
    if (user.rowCount < 1) {
      throw new ErrorResponse(400, "failed to create user")
    }

    res.json({
      message: "success",
      user
    })
  } catch (error) {
    next(error)
  }
})

UserRoute.get("/me", async (req, res, next) => {
  try {
    const { username } = await req.body
    if (!username) {
      throw new ErrorResponse(400, "needed username!!")
    }

    const user = await UserDto.index(username);
    if (user.rowCount < 1) {
      throw new ErrorResponse(404, "user not found!!")
    }

    res.json({
      data: user.rows
    })

  } catch (error) {
    next(error)
  }
})

export { UserRoute }