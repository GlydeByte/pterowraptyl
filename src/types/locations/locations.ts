import { Meta } from '../common.js';

export interface LocationAttributes {
  id: number;
  short: string;
  long: string;
  created_at: string;
  updated_at: string;
}

export interface LocationRelationships {
  nodes?: {
    object: "list";
    data: {
      object: "node";
      attributes: {
        id: number;
        public: boolean;
        name: string;
        fqdn: string;
      };
    }[];
  };
}

export interface Location {
  object: "location";
  attributes: LocationAttributes;
  relationships?: LocationRelationships;
}

export interface LocationsList {
  object: "list";
  data: Location[];
  meta: Meta;
}

export interface LocationIdRequest {
  id: number;
}

export interface CreateLocationRequest {
  short: string;
  long?: string;
}

export interface LocationUpdateRequest {
  id: number;
  short?: string;
  long?: string;
}