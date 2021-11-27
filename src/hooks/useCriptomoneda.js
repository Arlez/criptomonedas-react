import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 1.2rem;
`;
const useCriptomoneda = (label, stateInicial, opciones) => {


    const [state, actualizarState] = useState(stateInicial);

    const SeleccionarCripto = () => (    
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option>-Seleccione Moneda-</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))} 
            </Select>
        </Fragment>
    );

    //retornar state, interfaz y funcion que modifica el state
    return [state, SeleccionarCripto, actualizarState];
}

export default useCriptomoneda;