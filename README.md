# Remember That Guy

## 機能

- 直近３試合にいたプレイヤーを記録しておける
  - 今のところ(2019/08/28)一人用

## これからやること

- 本番対応
- 多人数対応
- 例外処理

## 立ち上げ

**PostgreSQL と yarn が入ってる前提**

### 1. DB 作成

PostgreSQL に本アプリ用の DB を作成

### 2. .env ファイルを作成

`.env.example`をコピーし、DB の情報を追加

### 3. RIOT API のための KEY を取得

https://developer.riotgames.com/ にアクセスして API KEY を取得し、.env に追加  
ついでに自分のサモナーネームを`src/components/past-games/PlayerRow.tsx`内にある`SUMMONER_NAME`に追加

### 4. 立ち上げ

```
# パッケージインストール
$ yarn

# webpack-dev-server立ち上げ
$ yarn frontend-start

# Express立ち上げ
$ yarn backend-start
```
