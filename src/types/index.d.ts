// ==================== RESPONSE ====================
export interface IResponse<T> {
  statusCode: number
  message: string
  data: T | T[]
}

export interface Id {
  id: string
}
