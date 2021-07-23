export interface AuthInfo {
  apikey?: string;
  trackKey?: string;
  sdkVersion: string;
  sdkName: string;
  trackerId: string;
}

export interface DeviceInfo {
  netType: string;
  clientWidth: number;
  clientHeight: number;
  ratio: number;
}

export enum ERRORTYPES {
  UNKNOWN = "UNKNOWN",
  UNKNOWN_FUNCTION = "UNKNOWN_FUNCTION",
  JAVASCRIPT_ERROR = "JAVASCRIPT_ERROR",
  LOG_ERROR = "LOG_ERROR",
  HTTP_ERROR = "HTTP_ERROR",
  FETCH_ERROR = "FETCH_HTTP_ERROR",
  VUE_ERROR = "VUE_ERROR",
  REACT_ERROR = "REACT_ERROR",
  RESOURCE_ERROR = "RESOURCE_ERROR",
  PROMISE_ERROR = "PROMISE_ERROR",
  ROUTE_ERROR = "ROUTE_ERROR",
}

export enum BREADCRUMBTYPES {
  ROUTE = "Route",
  CLICK = "UI.Click",
  XHR = "xhr",
  CONSOLE = "Console",
  FETCH = "Fetch",
  UNHANDLEDREJECTION = "Unhandledrejection",
  CODE_ERROR = "Code Error",
  VUE = "Vue",
  REACT = "React",
  RESOURCE = "Resource",
  CUSTOMER = "Customer",
}

export enum Severity {
  Else = "else",
  Error = "error",
  Warning = "warning",
  Info = "info",
  Debug = "debug",
  /** 上报的错误等级 */
  Low = "low",
  Normal = "normal",
  High = "high",
  Critical = "critical",
}

export type TNumStrObj = number | string | object;

export interface TriggerConsole {
  args: any[];
  level: string;
}

export interface BreadcrumbPushData {
  type: BREADCRUMBTYPES;
  data: ReportDataType | TriggerConsole | TNumStrObj;
  category?: string;
  time?: number;
  level: Severity;
}

export interface ReportDataType {
  type?: ERRORTYPES;
  message?: string;
  url: string;
  name?: string;
  stack?: any;
  time?: number;
  errorId?: number;
  level: string;
  elapsedTime?: number;
  request?: {
    httpType?: string;
    traceId?: string;
    method?: string;
    url?: string;
    data?: any;
  };
  response?: {
    status: number;
    data: string;
  };
  componentName?: string;
  propsData?: any;
  customTag?: string;
}

export interface TransportDataType {
  authInfo: AuthInfo;
  breadcrumb?: BreadcrumbPushData[];
  data?: ReportDataType;
  record?: any[];
  deviceInfo?: DeviceInfo;
}

/**
 * 用户行为整合类型
 */
export enum BREADCRUMBCATEGORYS {
  HTTP = "http",
  USER = "user",
  DEBUG = "debug",
  EXCEPTION = "exception",
  LIFECYCLE = "lifecycle",
}
