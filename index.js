import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://api.coinpaprika.com/v1/";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "global");

        const marketCap = formatter.format(response.data.market_cap_usd);
        const totalCurrencies = response.data.cryptocurrencies_number;

        const bitcoinDominance = response.data.bitcoin_dominance_percentage + "%";

        const dayVolume = formatter.format(response.data.volume_24h_usd);

        const marketCapATH = formatter.format(response.data.market_cap_ath_value);

        const dayMarketVolumeATH = formatter.format(response.data.volume_24h_ath_value);

        const dayMarketCapChange = response.data.market_cap_change_24h;
        const dayMarketVolumeChange = response.data.volume_24h_change_24h;

        // console.log(result);
        res.render("index.ejs", { 
            totalMarketCap: marketCap,
            totalNumCurrencies: totalCurrencies,
            bitcoinDominancePercentage: bitcoinDominance,
            volumeDay: dayVolume,
            ATHMarketCap: marketCapATH,
            marketVolumeATHDay: dayMarketVolumeATH,
            marketCapChangeDay: dayMarketCapChange,
            marketVolumeChangeDay: dayMarketVolumeChange
        });
      } catch (error) {
          if (error.response && error.response.status == 429) {
            const customError = {
              error: 'You have reached the maximum request limit',
            }
            console.error(customError);
            res.render("error.ejs", { 
              code: 429,
              error: 'You have reached the maximum request limit' 
            });
          } else {
            console.error("Failed to make request:", error.message);
            res.render("error.ejs", {
              error: error.message,
            });
          }
          
      }

      res.render("index.ejs");
});

app.get("/ticker", async (req,res) => {
    res.render("ticker.ejs");
})

app.post("/ticker-submit", async (req,res) => {
    var coinId = req.body["coin-id"]; 
    try {
        const response = await axios.get(API_URL + "/ticker/" + coinId);

        const coinName = response.data.name;
        const coinSymbol = response.data.symbol;
        const price  = formatter.format(response.data.price_usd);
        const sevenDayChange = response.data.percent_change_7d;
        const rank = response.data.rank;

        const coinMKTCap = formatter.format(response.data.market_cap_usd);
        const coinDayVolume = formatter.format(response.data.volume_24h_usd);

        const circulatingSupply = formatter.format(response.data.circulating_supply);
        const totalSupply = formatter.format(response.data.total_supply);
        const maxSupply = formatter.format(response.data.max_supply);

        res.render("ticker.ejs", { 
            nameCoin: coinName,
            symbolCoin: coinSymbol,
            coinPrice: price,
            changeSevenDay: sevenDayChange,
            coinRank: rank,
            MKTCap: coinMKTCap,
            dayVolumeCoin: coinDayVolume,
            supplyCirculating: circulatingSupply,
            supplyTotal: totalSupply,
            supplyMax: maxSupply
        });
      } catch (error) {
        if (error.response && error.response.status == 404) {
          const customError = {
            error: 'id not found',
          }
          console.error(customError);
          res.render("error.ejs", { 
            code: 404,
            error: 'Id not found' 
          });
        } else if (error.response && error.response.status == 404) {
            const customError = {
              error: 'You have reached the maximum request limit',
            }
            console.error(customError);
            res.render("error.ejs", { 
              code: 429,
              error: 'You have reached the maximum request limit' 
            });
        } else {
            console.error("Failed to make request:", error.message);
            res.render("error.ejs", {
              error: error.message,
            });
        }
      }
    console.log(coinId);
})

app.get("/API", async (req,res) => {
  res.render("api.ejs");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})