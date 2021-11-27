import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './criptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 5rem;
  margin-top: 6rem;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  //definir starte
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCripto] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [spinner, guardarSpinner] = useState(false);

  useEffect( () => {
    const cotizarCripto = async () => {
      if(moneda === '') return;
      //consultar API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  
      const respuesta = await axios.get(url);
  
      guardarSpinner(true);

      setTimeout(() => {        
        guardarSpinner(false);
        guardarResultado(respuesta.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);
    }  
    cotizarCripto();
  }, [moneda, criptomoneda])


  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen criptomoneda"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />

        { spinner ? <Spinner/> : <Cotizacion
          resultado={resultado}
        /> }

        
      </div>

     

    </Contenedor>
  );
}

export default App;
