import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 2rem;
    font-weight: bold;
    font-size: 1.6rem;
    padding: .7rem;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 1rem;
    color: white;
    transition: background-color .3 ease-in-out;
    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCripto}) => {
    //state lista de criptos desde API
    const [listadoCripto, guardarListado] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar', pais:'Estados Unidos'},
        {codigo: 'CLP', nombre: 'Peso', pais: 'Chile'},
        {codigo: 'MXN', nombre: 'Peso', pais: 'Mexico'},
        {codigo: 'EUR', nombre: 'Euro', pais: 'Europa'},
        {codigo: 'GBP', nombre: 'Libra Esterlina', pais: 'Reino Unido'}
    ];

    //utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //utilizar useCriptomoneda 
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listadoCripto);

    //llamar a la API
    useEffect(() => {
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=CLP';

            const resultado = await axios.get(url);

            guardarListado(resultado.data.Data);
        }
        consultarApi();
    }, []);


    //submit

    const cotizarMoneda = e => {
        e.preventDefault();
        //validar si los campos tienen algo

        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje="Ambos Campos son Obligatorios"/> : null }

            <SelectMonedas/>

            <SelectCripto/>
            <Boton
                type="submit"
                value="Cotizar"
            />
        </form>
     );
}
 
Formulario.propTypes = {
    guardarCripto: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired
}

export default Formulario;