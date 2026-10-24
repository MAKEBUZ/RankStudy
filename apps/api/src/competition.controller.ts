import {Body,Controller,Delete,Get,Inject,Param,ParseUUIDPipe,Post,Query,Req} from '@nestjs/common';
import type {Request} from 'express';
import {CompetitionService} from './competition.service';
import {CommunityService,countries} from './community.service';
const session=(r:Request)=>r.cookies?.rs_session as string|undefined;
@Controller('competition')
export class CompetitionController{
 constructor(@Inject(CompetitionService) private game:CompetitionService,@Inject(CommunityService) private community:CommunityService){}
 @Get('state') state(@Req() r:Request){return this.game.state(session(r));}
 @Post('queue') queue(@Req() r:Request,@Body() b:unknown){return this.game.joinQueue(session(r),b);}
 @Post('queue/cancel') cancel(@Req() r:Request){return this.game.cancelQueue(session(r));}
 @Post('duels/:id/answer') answer(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.game.answer(session(r),id,b);}
 @Post('duels/:id/abandon') abandon(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.game.abandon(session(r),id);}
 @Get('history') history(@Req() r:Request){return this.community.history(session(r));}
 @Get('duels/:id/review') review(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.community.review(session(r),id);}
 @Post('duels/:id/saved') save(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Body() b:unknown){return this.community.saveReview(session(r),id,b);}
 @Get('saved') saved(@Req() r:Request){return this.community.saved(session(r));}
 @Get('stats') stats(@Req() r:Request,@Query() q:unknown){return this.community.stats(session(r),q);}
 @Get('people') people(@Req() r:Request,@Query() q:unknown){return this.community.search(session(r),q);}
 @Post('challenges') challenge(@Req() r:Request,@Body() b:unknown){return this.community.challenge(session(r),b);}
 @Get('challenges') inbox(@Req() r:Request){return this.community.inbox(session(r));}
 @Post('challenges/accept') accept(@Req() r:Request,@Body() b:unknown){return this.community.accept(session(r),b);}
 @Get('groups') groups(@Req() r:Request){return this.community.groups(session(r));}
 @Post('groups') createGroup(@Req() r:Request,@Body() b:unknown){return this.community.createGroup(session(r),b);}
 @Post('groups/join') join(@Req() r:Request,@Body() b:unknown){return this.community.joinGroup(session(r),b);}
 @Get('groups/:id/members') members(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.community.members(session(r),id);}
 @Delete('groups/:id/members/:userId') remove(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string,@Param('userId',ParseUUIDPipe) user:string){return this.community.removeMember(session(r),id,user);}
 @Post('groups/:id/code') rotate(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.community.rotateCode(session(r),id);}
 @Delete('groups/:id') delete(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.community.deleteGroup(session(r),id);}
 @Get('ranking') ranking(@Req() r:Request,@Query() q:unknown){return this.community.ranking(session(r),q);}
 @Get('countries') countries(){return countries;}
 @Post('country') country(@Req() r:Request,@Body() b:unknown){return this.community.country(session(r),b);}
 @Get('notifications') notifications(@Req() r:Request){return this.community.notifications(session(r));}
 @Post('notifications/:id/read') read(@Req() r:Request,@Param('id',ParseUUIDPipe) id:string){return this.community.readNotification(session(r),id);}
}
