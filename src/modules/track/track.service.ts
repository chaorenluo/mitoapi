import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Track } from "./track.entity";

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>
  ) {}
  async createTrackId(trackName: string) {
    const data = await this.trackRepository.findOne({ trackName });
    console.log(data);
    if (data) {
      throw new HttpException("项目名称以存在", HttpStatus.BAD_REQUEST);
    }
    const track = this.trackRepository.create();
    track.trackName = trackName;
    await this.trackRepository.save(track);
    return track;
  }

  async getTrack(trackKey: string) {
    console.log("trackKey---", trackKey);
    const data = await this.trackRepository.findOne({ trackKey });
    return data;
  }
}
