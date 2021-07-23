import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Collectively } from "../collectively/errorIntroduction.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn("uuid")
  trackKey: string;

  @Column()
  trackName: string;

  @OneToMany(() => Collectively, (Collectively) => Collectively.track)
  collectively: Collectively[];

  @CreateDateColumn({
    type: "datetime",
    comment: "创建时间",

    name: "create_at",
  })
  createAt: Date;
}
