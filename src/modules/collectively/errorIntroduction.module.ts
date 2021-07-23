import { Module } from "@nestjs/common";
import { ErrorIntroductionController } from "./errorIntroduction.controller";
import { ErrorIntroductionService } from "./errorIntroduction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorIntroduction } from "./errorIntroduction.entity";
import { TrackModule } from "../track/track.module";
@Module({
  imports: [TypeOrmModule.forFeature([ErrorIntroduction]), TrackModule],
  providers: [ErrorIntroductionService],
  controllers: [ErrorIntroductionController],
  exports: [ErrorIntroductionService],
})
export class ErrorIntroductionModule {}
