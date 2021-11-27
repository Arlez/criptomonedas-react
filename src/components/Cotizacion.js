import React from 'react';
import styled from '@emotion/styled';

const CotizacionDiv = styled.div`
    color: white;
    font-family: Arial, Helvetica, sans-serif;
`;

const Parrafos = styled.p`
    font-size: 1.8rem;
    span{
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);

    return ( 
        <CotizacionDiv>
            <Parrafos>Valor: <span>{resultado.PRICE}</span></Parrafos>
            <Parrafos>Valor más alto: <span>{resultado.HIGHDAY}</span></Parrafos>
            <Parrafos>Valor más bajo: <span>{resultado.LOWDAY}</span></Parrafos>
            <Parrafos>Cambio en 24 Horas: <span>{resultado.CHANGEPCT24HOUR}</span></Parrafos>
            <Parrafos>Última actualización: <span>{resultado.LASTUPDATE}</span></Parrafos>
        </CotizacionDiv>
    );
}
 
export default Cotizacion;