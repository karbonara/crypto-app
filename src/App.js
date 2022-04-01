import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CryptoTable from './components/crypto-table/crypto-table';
import './App.css';

function App() {

  const URL = 'https://www.cryptocompare.com/';

  const [dataCrtypto, setDataCrtypto] = useState([]);

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      .then(({ data }) => {
        const coins = data.Data.map((coin) => {
          const obj = {
            name: coin.CoinInfo.Name,
            FullName: coin.CoinInfo.FullName,
            imageUrl: `${URL}/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(3),
            volume24hour: coin.RAW.USD.VOLUME24HOUR.toFixed(5),
          };
          return obj;
        })
        setDataCrtypto(coins)
      });
  }, []);

  return (
    <div className='app'>
      <Container maxWidth="xl">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CryptoTable dataCrtypto={dataCrtypto} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;
