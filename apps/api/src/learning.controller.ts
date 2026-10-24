import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { LearningService } from './learning.service';
const session=(r:Request)=>r.cookies?.rs_session as string|undefined;
@Controller()
export class LearningController{
 constructor(@Inject(LearningService) private learning:LearningService){}
 @Get('catalog') catalog(){return this.learning.catalog();}
 @Get('profile') profile(@Req() r:Request){return this.learning.profile(session(r));}
 @Patch('profile') update(@Req() r:Request,@Body() b:unknown){return this.learning.updateProfile(session(r),b);}
 @Post('teacher/application') apply(@Req() r:Request,@Body() b:unknown){return this.learning.applyTeacher(session(r),b);}
 @Get('moderation/teachers') applications(@Req() r:Request){return this.learning.applications(session(r));}
 @Post('moderation/teachers/:id') reviewTeacher(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.learning.reviewTeacher(session(r),id,b);}
 @Get('questions') questions(@Req() r:Request){return this.learning.questions(session(r));}
 @Post('questions') create(@Req() r:Request,@Body() b:unknown){return this.learning.saveQuestion(session(r),b);}
 @Patch('questions/:id') edit(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.learning.saveQuestion(session(r),b,id);}
 @Get('questions/:id/history') history(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.learning.history(session(r),id);}
 @Post('moderation/questions/:id') reviewQuestion(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.learning.reviewQuestion(session(r),id,b);}
 @Post('calibration') start(@Req() r:Request,@Body() b:unknown){return this.learning.startCalibration(session(r),b);}
 @Post('calibration/:id/finish') finish(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.learning.finishCalibration(session(r),id,b);}
}
