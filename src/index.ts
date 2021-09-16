/*
  # Author : Watchara Pongsri
  # [github/X-c0d3] https://github.com/X-c0d3/
  # Web Site: https://www.rockdevper.com
*/

import * as cronJob from 'node-cron'
import * as dotenv from 'dotenv';
dotenv.config();

import { AppConfig } from './constants/Constants';
import { getMinerInfo} from './util/DuinoCoin';
import { sendLineNotify } from './util/LineNotify';
import { getPriceMarketCap } from './util/MarketCap';


// Market price from https://coinmarketcap.com/currencies/chia-network/
const runTask = async () => {
  try {
    var pricevalue = await getPriceMarketCap('chia-network');
    let marketPrice = parseFloat(pricevalue.replace(/[฿]/g, m => '').replace(/[$]/g, m => '').replace(/[,]/g, m => ''));
  
    var msg = await getMinerInfo();
    if (AppConfig.ENABLE_LINE_NOTIFY === 'true')
      sendLineNotify(`${msg}`);
  } catch (error: any) {
    console.log('Error:' + error.message)
  }
}

runTask();
