import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    console.log('xử lý middleware ở đây nhé')
    next()
  }
}
