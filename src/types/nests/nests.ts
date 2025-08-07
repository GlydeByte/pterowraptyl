import { Meta } from "../common.js";

export interface NestAttributes {
  id: number;
  uuid: string;
  author: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EggAttributes {
  id: number;
  uuid: string;
  name: string;
  nest: number;
  author: string;
  description: string;
  docker_image: string;
  startup: string;
  created_at: string;
  updated_at: string;
}

export interface Egg {
  object: "egg";
  attributes: EggAttributes;
}

export interface EggsList {
  object: "list";
  data: Egg[];
  meta: Meta;
}

export interface NestRelationships {
  eggs?: {
    object: "list";
    data: Egg[];
  };
  servers?: {
    object: "list";
    data: {
      object: "server";
      attributes: {
        id: number;
        uuid: string;
        name: string;
        nest: number;
      };
    }[];
  };
}

export interface Nest {
  object: "nest";
  attributes: NestAttributes;
  relationships?: NestRelationships;
}

export interface NestsList {
  object: "list";
  data: Nest[];
  meta: Meta;
}

export interface NestIdRequest {
  id: number;
}

export interface EggIdRequest {
  id: number;
}

export interface NestEggRequest {
  nestId: number;
  eggId: number;
}
