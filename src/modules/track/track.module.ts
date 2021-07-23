import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "./track.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
