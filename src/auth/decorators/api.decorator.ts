import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiAuth = (() => {
    return applyDecorators(
          ApiResponse({
            status: 401,
            description: "Missing or invalid Token"
          }),
          ApiResponse({
            status: 403,
            description: "Missing Role"
          }),
          ApiResponse({
            status: 500,
            description: "Internal Server Error"
          })
    );
})