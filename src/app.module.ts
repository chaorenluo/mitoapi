import * as fs from "fs-extra";
import * as path from "path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TrackModule } from "./modules/track/track.module";
import { ErrorIntroductionModule } from "./modules/collectively/errorIntroduction.module";

import { Track } from "./modules/track/track.entity";
import {
  Collectively,
  Response,
  Request,
  ErrorIntroduction,
} from "./modules/collectively/errorIntroduction.entity";

// 配置文件

const isProd = process.env.NODE_ENV === "production";
let envFilePath = path.resolve(__dirname, "../.env");

if (!fs.existsSync(envFilePath)) {
  // tslint:disable-next-line:no-console
  console.warn("can not locate .env file in " + path.resolve(__dirname, "../"));
}

if (!isProd && fs.existsSync(path.resolve(__dirname, "../.env.prod"))) {
  envFilePath = path.resolve(__dirname, "../.env.prod");
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envFilePath] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        entities: [Track, Request, Response, Collectively, ErrorIntroduction],
        host: configService.get("DB_HOST", "0.0.0.0"),
        port: configService.get<number>("DB_PORT", 3306),
        username: configService.get("DB_USER", "root"),
        password: configService.get("DB_PASSWD", "123ABC123"),
        database: configService.get("DB_DATABASE", "track"),
        charset: "utf8mb4",
        timezone: "+08:00",
        synchronize: true,
      }),
    }),
    TrackModule,
    ErrorIntroductionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
