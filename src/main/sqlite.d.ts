export interface queryParam {
  sql: string
  params?: []
}

export interface insertParam<T> {
  table: string
  data: { [key: string]: T }
}

export interface updateParam<T> {
  table: string
  data: { [key: string]: T }
  condition: string
}

export interface deleteParam {
  table: string
  condition: string
}
