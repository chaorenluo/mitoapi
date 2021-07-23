import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import {
  ErrorIntroduction,
  Request,
  Response,
  Collectively,
} from "./errorIntroduction.entity";
import { TrackService } from "../track/track.service";

import { TransportDataType } from "./interface";

@Injectable()
export class ErrorIntroductionService {
  constructor(
    @InjectRepository(ErrorIntroduction)
    private readonly errorIntroductionRepository: Repository<ErrorIntroduction>,
    private readonly trackService: TrackService
  ) {}
  async setErrorInfo(transportData: TransportDataType) {
    const errorIntroduction = this.errorIntroductionRepository.create();
    const connection = getConnection();
    const tarckData = await this.trackService.getTrack(
      transportData.authInfo.apikey
    );
    if (!tarckData) {
      throw new HttpException("找不到apikey", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let response: Response;
    if (transportData.data.response) {
      const responseData = transportData.data.response;
      response = new Response();
      response.data = responseData.data;
      response.status = responseData.status;
      await connection.manager.save(response);
    }
    let request: Request;
    if (transportData.data.request) {
      const responseData = transportData.data.request;
      request = new Request();
      request.data = responseData.data;
      request.method = responseData.method;
      request.url = responseData.url;
      request.traceId = responseData.traceId;
      await connection.manager.save(request);
    }
    const {
      url,
      componentName,
      elapsedTime,
      errorId,
      level,
      message,
      name,
      propsData,
      time,
      type,
      stack,
    } = transportData.data;

    const collectively = new Collectively();

    collectively.url = url;
    collectively.componentName = componentName;
    collectively.elapsedTime = elapsedTime ? elapsedTime.toString() : "";
    collectively.errorId = errorId;
    collectively.level = level;
    collectively.message = message;
    collectively.name = name;
    collectively.propsData = propsData ? JSON.stringify(propsData) : "";
    collectively.time = time ? time.toString() : "";
    collectively.type = type;
    collectively.response = response ? response : null;
    collectively.request = request ? request : null;
    collectively.track = tarckData;
    collectively.stack = stack ? JSON.stringify(stack) : "";
    await connection.manager.save(collectively);
    const count = transportData.breadcrumb.length;
    const introductionData = transportData.breadcrumb[count - 1];
    console.log(introductionData);
    console.log(introductionData.type);
    errorIntroduction.collectively = collectively;
    errorIntroduction.time = String(introductionData.time);
    errorIntroduction.type = introductionData.type;
    errorIntroduction.category = introductionData.category;
    errorIntroduction.level = introductionData.level;
    await this.errorIntroductionRepository.save(errorIntroduction);
    return "上报成功";
  }

  async getErrList() {
    return await this.errorIntroductionRepository.find({
      relations: [
        "collectively",
        "collectively.request",
        "collectively.response",
      ],
    });
  }
}
