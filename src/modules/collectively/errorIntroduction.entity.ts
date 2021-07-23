import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Track } from "../track/track.entity";
import {
  ERRORTYPES,
  Severity,
  BREADCRUMBCATEGORYS,
  BREADCRUMBTYPES,
} from "./interface";

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  ResponseId: string;

  @Column({ comment: "ajax状态码", default: 500 })
  status?: number;

  @Column({ comment: "ajax返回数据", default: "" })
  data?: string;
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  requestId: string;

  @Column({ comment: "错误统计id", default: "" })
  traceId?: string;

  @Column({ comment: "ajax错误请求方法", default: "" })
  method?: string;

  @Column({ comment: "ajax请求url", default: "" })
  url?: string;

  @Column({ comment: "ajax请求发送数据", default: "" })
  data?: string;
}

@Entity()
export class Collectively {
  @PrimaryGeneratedColumn()
  collectivelyId: string;

  @Column({
    comment: "上报错误类型",
    type: "enum",
    enum: ERRORTYPES,
    default: ERRORTYPES.UNKNOWN,
  }) // 枚举
  type?: string;

  @Column({ comment: "错误信息", default: "" })
  message?: string;

  @Column({ comment: "错误链接", default: "" })
  url: string;

  @Column({ comment: "错误名称", default: "" })
  name?: string;

  @Column({
    type: "nvarchar",
    length: 3000,
    comment: "错误堆栈信息",
    default: "",
  })
  stack?: string;

  @Column({ comment: "错误发生时间", default: "" })
  time?: string;

  @Column({ comment: "错误id", default: 0 })
  errorId?: number;

  @Column({
    comment: "等级程度",
    type: "enum",
    enum: Severity,
    default: Severity.Low,
  })
  level?: string;

  @Column({ comment: "ajax请求时间", default: "" })
  elapsedTime?: string;

  @OneToOne(() => Request)
  @JoinColumn()
  request?: Request;

  @OneToOne(() => Response)
  @JoinColumn()
  response?: Response;

  @Column({ comment: "发生错误的vue组件名称", default: "" })
  componentName?: string;

  @Column({ comment: "发生错误组件的props", default: "" })
  propsData?: string;

  @ManyToOne(() => Track, (Track) => Track.collectively)
  track: Track;
}

@Entity()
export class ErrorIntroduction {
  @PrimaryGeneratedColumn()
  introductionId: string;

  @Column({
    comment: "上报错误种类",
    type: "enum",
    enum: BREADCRUMBCATEGORYS,
    default: BREADCRUMBCATEGORYS.DEBUG,
  })
  category: string;

  @Column({
    comment: "上报错误类型",
    type: "enum",
    enum: BREADCRUMBTYPES,
    default: BREADCRUMBTYPES.CONSOLE,
  }) // 枚举
  type: string;

  @Column({
    comment: "等级程度",
    type: "enum",
    enum: Severity,
    default: Severity.Low,
  })
  level: string;

  @Column({ comment: "错误发生时间", default: 0 })
  time: string;

  @OneToOne(() => Collectively)
  @JoinColumn()
  collectively?: Collectively;
}
