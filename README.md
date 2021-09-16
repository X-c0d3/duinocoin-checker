### Duino coin Checker

![Duino coin Checker](https://raw.githubusercontent.com/X-c0d3/duinocoin-checker/main/Screenshot/ScreenShot1.png)

```
need to install nodejs
https://nodejs.org/en/download/

1. Download Source code ลงไว้ที่เครื่อง
git clone https://github.com/X-c0d3/duinocoin-checker.git
cd duinocoin-checker

2. ทำการ Install package module
yarn install

3. สร้างไฟล์ .env ดังตัวอย่างด้านล่าง
4. รันโปรแกรมด้วยคำสั่ง
yarn start
```

Required .env

```ruby
VERSION = 0.1
API_URL = https://server.duinocoin.com
ENABLE_LINE_NOTIFY=true
LINE_TOKEN = <YOUR LINE TOKEN>
USERNAME= <YOUR USERNAME>
CURRENCY = THB
EXCHANGE_RATE_USD = 31.5
```

วิธีติดตั้งผ่าน cron job (Linux Only)

```ruby
0 0 * * * /<username>/duinocoin-checker/run.sh
```

<br />
ขอให้สนุกกับการขุดครับ :)
