export interface FlowData {
  tasks: Task[];
  links?: Link[];
  errorHandler?: {
    tasks: Task[];
    links?: Link[];
  };
}

// todo: document usage and correspondence with engine model
export interface Attribute {
  name: string;
  type: string;
  value: any;
}

export interface Task {
  id: string;
  type: number;
  activityRef: string;
  name?: string;
  description?: string;
  attributes?: Attribute[];
  inputMappings?: { [property: string]: any };
  activitySettings?: { [settingName: string]: any };
  settings?: {
    flowPath?: string;
    iterate?: string;
  };
}

export interface Mapping {
  mapTo: string;
  type: number;
  value: any;
}

export interface Link {
  // todo: used?
  id: number | string;
  // todo: used?
  name?: string;
  from: string;
  to: string;
  type?: number;
  value?: any;
}
