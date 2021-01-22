import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(@Req() req, @Res() res){
    res.log.info('Hola Nes-fastify controller')
    res.status(200).send({
      message: "Hola Nest-Fastify"
    })
  }
}
