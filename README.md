
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

## Application Screenshots
![image](https://github.com/pranav797/CryptoPulse/assets/68436376/98bd09bc-9f8e-453d-885b-260a0fd5d0f4)
![image](https://github.com/pranav797/CryptoPulse/assets/68436376/e31b352a-8479-4c74-b82b-10a62e4c4030)
![image](https://github.com/pranav797/CryptoPulse/assets/68436376/0085204f-9f6d-49f0-95ac-f780503355af)
![image](https://github.com/pranav797/CryptoPulse/assets/68436376/c6b9d194-338c-423c-ba8d-7c7c29105835)
![image](https://github.com/pranav797/CryptoPulse/assets/68436376/925d30af-054a-4760-94a1-4ebfedf6dbf4)

