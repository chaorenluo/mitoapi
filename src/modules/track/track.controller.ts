import { Controller, Get, UnauthorizedException } from "@nestjs/common";
import { TrackService } from "./track.service";

@Controller("track")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get("/create")
  createTrackId() {
    return this.trackService.createTrackId("100触屏");
  }
}
