
# CryptoPulse

A javascript website displays up-to-date information about the cryptocurrency market.
## Deployment

To deploy this project, clone 'master' repository and run

```bash
  npm i
  node index.js
```


## API Reference

#### Get global crypto market information

```http
  GET https://api.coinpaprika.com/v1/global
```

#### Get currency information

```http
  GET https://api.coinpaprika.com/v1/ticker/${coin_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `coin_id`      | `string` | **Required**. Id of coin to fetch |



## Acknowledgements

 - [API taken from Coinpaprika](https://coinpaprika.com/)

