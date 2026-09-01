import {players,Player,Club} from './game';
export type Contract={playerId:string;years:number;weeklyWage:number};
export type CareerState={season:number;week:number;club:Club;contracts:Contract[];roster:Player[]};
export function newCareer():CareerState{return{season:1,week:1,club:{name:'Lyg FC',budget:42800000,fans:68420,reputation:78,points:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0},contracts:players.map(p=>({playerId:p.id,years:3,weeklyWage:Math.round(p.value/500)})),roster:[...players]}};
export function train(state:CareerState,intensity:'light'|'normal'|'hard'){const gain=intensity==='hard'?1:intensity==='normal'?.5:.2;state.roster=state.roster.map(p=>({...p,morale:Math.min(100,p.morale+(intensity==='hard'?1:2)),fitness:Math.max(60,p.fitness-(intensity==='hard'?5:intensity==='normal'?2:1)),overall:Math.min(p.potential,p.overall+gain)}));return state}
export function renew(state:CareerState,playerId:string,years:number){const c=state.contracts.find(x=>x.playerId===playerId);if(c)c.years=years;return state}
export function endWeek(state:CareerState){state.week++;if(state.week>38){state.season++;state.week=1;state.club.points=0;state.club.wins=0;state.club.draws=0;state.club.losses=0;state.club.goalsFor=0;state.club.goalsAgainst=0}return state}
export function saveCareer(state:CareerState){localStorage.setItem('lyg-career',JSON.stringify(state))}
export function loadCareer():CareerState|null{const raw=localStorage.getItem('lyg-career');return raw?JSON.parse(raw):null}