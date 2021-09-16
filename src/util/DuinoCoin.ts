/*
  # Author : Watchara Pongsri
  # [github/X-c0d3] https://github.com/X-c0d3/
  # Web Site: https://www.rockdevper.com
*/

import axios from 'axios';
import * as _ from "lodash";
import { AppConfig } from '../constants/Constants';
import { Duinocoin } from '../types/DuinoCoin';

const convert2THB = (price: any, marketPrice: number) => {
  return `${(marketPrice * parseFloat(price)).toFixed(2)} ${
    AppConfig.CURRENCY
  }`;
};

const convertHashSize = (bytes: number, preFix: string = 'H/s')  => {
  var sizes = ['', 'K', 'M', 'G', 'T'];
  if (bytes == 0) return '0 H';
  var i =  Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i] + preFix;
}

const getMinerInfo = async () => {
  let msg = '';
  await axios
    .get<Duinocoin>(`${AppConfig.API_URL}/users/${AppConfig.USERNAME}`)
    .then(async (response)  => {
      if (response.data.success) {
        var { balance, username  } = response.data.result.balance;
        var miners = response.data.result.miners.filter(f => f.rejected === 0);
        let sumHashRate = convertHashSize(_.sumBy(miners, 'hashrate'));
        let minersSorted = _.sortBy( miners, 'identifier' );

       var duinoInfo =  await axios.get<any>(`${AppConfig.API_URL}/api.json`)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          } else console.log('ERROR');
        });
        let ducoPrice = duinoInfo['Duco price'];
        let usdPrice = (ducoPrice * balance);
        let thbPrice = convert2THB(usdPrice, Number(AppConfig.EXCHANGE_RATE_USD));
        console.log(' --- DUINO COIN CHECKER --- ');
        console.log(`Username: ${username}`);
        console.log(`Balance: ${balance.toFixed(4)} DUCO`);
        console.log(`Final Balance: ≈ ${usdPrice.toFixed(2)} USD  or (${thbPrice})`);;
        console.log(`Total Hashrate: ${sumHashRate}`);
        console.log(`Total Miners: ${miners.length} workers`);
        console.log(``);

        console.log(' --- Current Market Price --- ');
        Object.getOwnPropertyNames(duinoInfo).filter(g => g.match(/^Duco /)).map(key => {
          console.log(`${key}: ${duinoInfo[key]} `);
        })
        console.log(``);
          
        minersSorted.forEach(v => {
          console.log(`[+] ${v.identifier} (${convertHashSize(v.hashrate)}) diff: ${convertHashSize(v.diff, '')} (${v.sharetime}s) algo: ${v.algorithm} - ${v.software}`);
        })
        console.log(`Total ${miners.length} workers  Hashrate: ${sumHashRate}/s`);

        //For Line Notify format
                msg = `
--- DUINO COIN CHECKER ----
Username : ${username}
Balance: ${balance.toFixed(4)} DUCO
Balance: ≈ ${usdPrice.toFixed(2)} USD (${thbPrice})
Total Hashrate: ${sumHashRate}/s
Total Miners: ${miners.length} workers

--- Current Market Price ---
${ Object.getOwnPropertyNames(duinoInfo).filter(g => g.match(/^Duco price/)).map(key => {
  return ` ${key}: ${duinoInfo[key]} `;
}).join('\r\n')}

Total ${miners.length} workers  HRate: ${sumHashRate}
${minersSorted.map(v =>  {
  return ` ${v.identifier} (${convertHashSize(v.hashrate)})`
}).join('\r\n')}
                `;
      } else console.log('ERROR');
    });

  return msg;
};

export { getMinerInfo };
