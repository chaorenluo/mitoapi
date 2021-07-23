import { Controller, Get, Post, Body } from "@nestjs/common";
import { ErrorIntroductionService } from "./errorIntroduction.service";

@Controller("collectively")
export class ErrorIntroductionController {
  constructor(private readonly errorIntroduction: ErrorIntroductionService) {}

  @Post("/update")
  setErrorInfo(@Body() transportData) {
    // this.collectively.
    return this.errorIntroduction.setErrorInfo(transportData);
  }

  @Get("/list")
  getInfoList() {
    return this.errorIntroduction.getErrList();
  }
}
