export const ranks=[
 {id:'bronce',name:'Bronce',min:400,badge:'◆',color:'#a16d43'},
 {id:'plata',name:'Plata',min:900,badge:'◆◆',color:'#64748b'},
 {id:'oro',name:'Oro',min:1200,badge:'★',color:'#a66f00'},
 {id:'platino',name:'Platino',min:1500,badge:'✦',color:'#087f8c'},
 {id:'diamante',name:'Diamante',min:1800,badge:'❖',color:'#7156ba'},
];
export const rankFor=(elo:number)=>[...ranks].reverse().find(r=>elo>=r.min)||ranks[0];
export function eloAfter(own:number,opponent:number,result:0|0.5|1){
 const expected=1/(1+10**((opponent-own)/400));
 const delta=Math.max(-11,Math.min(11,Math.round(32*(result-expected))));
 return Math.max(400,Math.min(2400,own+delta));
}
export function answerPoints(correct:boolean,elapsed:number,duration:number){return correct?100+Math.round(50*Math.max(0,1-Math.max(0,elapsed)/duration)):0;}
export function searchRange(elapsed:number,base=100){return base*(elapsed>=10000?4:elapsed>=5000?2:1);}
export const competitionSettings={rounds:5,roundMs:20000,reconnectMs:20000,queueMs:15000,initialRange:100};
