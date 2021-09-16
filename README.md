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

```
ssh root@192.168.1.XX (เครืองที่รันจะต้องติดตั้ง nodejs git)
git clone https://github.com/X-c0d3/duinocoin-checker.git
cd duinocoin-checker
yarn install
yarn build
chmod +x run.sh
ทดสอบ
./run.sh
```

![Duino coin Checker](https://raw.githubusercontent.com/X-c0d3/duinocoin-checker/main/Screenshot/ScreenShot2.png)

crontab -e
เพิ่มเข้าไปใน crontab

```ruby
0 0 * * * /<username>/duinocoin-checker/run.sh
```

![Duino coin Checker](https://raw.githubusercontent.com/X-c0d3/duinocoin-checker/main/Screenshot/ScreenShot3.png)

<br />
ขอให้สนุกกับการขุดครับ :)
