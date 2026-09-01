import {Player,players,Club,transferCost} from './game';
export type Contract={playerId:string;salary:number;years:number};
export type Transfer={player:Player;fee:number;status:'listed'|'negotiating'|'signed'};
export function market():Transfer[]{return players.filter(p=>p.age<27).map(player=>({player,fee:transferCost(player),status:'listed'}));}
export function negotiate(t:Transfer,budget:number):Transfer{const offer=Math.round(t.fee*(.88+Math.random()*.18));return budget>=offer?{...t,fee:offer,status:'signed'}:{...t,status:'negotiating'};}
export function sign(t:Transfer,club:Club){if(t.status!=='signed'||club.budget<t.fee)return null;club.budget-=t.fee;return{player:t.player,contract:{playerId:t.player.id,salary:Math.round(t.player.value*.045),years:4} as Contract};}
export function train(p:Player,intensity:'light'|'normal'|'hard'= 'normal'){const gain=intensity==='hard'?2:intensity==='normal'?1:0;p.fitness=Math.max(65,p.fitness-(intensity==='hard'?7:intensity==='normal'?3:1));p.morale=Math.min(100,p.morale+(gain?2:1));if(p.overall<p.potential)p.overall=Math.min(p.potential,p.overall+gain);return p;}