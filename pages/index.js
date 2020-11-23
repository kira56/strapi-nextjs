import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import usePropiedades from '../hooks/usePropiedades';
import useFiltro from '../hooks/useFiltro'
import axios from 'axios'
import styled from '@emotion/styled';

const Contenedor = styled.div`
  margin:0 auto;
  width:95%;
  max-width:1200px;
`;

const Title = styled.h2`
  text-align:center;
  font-family: 'Lato', sans-serif;

`;

const Home = () => {

  const [propiedades, guardarPropiedades] = useState([]);
  const [filtradas, guardarFiltradas] = useState([])
  const { Propiedades } = usePropiedades(filtradas);
  const { categoria, FiltroUI } = useFiltro();

  // Llamado a la API

  useEffect(() => {
    if (categoria) {
      //filtrar propiedades por categoria
      const filtradas = propiedades.filter(propiedad => propiedad.categoria.id == categoria);
      guardarFiltradas(filtradas)
    } else {
      //consultar a la API
      const obtenerPropiedades = async () => {
        const resultado = await axios.get('http://localhost:1337/propiedades')
        guardarPropiedades(resultado.data)
        guardarFiltradas(resultado.data)

      }
      obtenerPropiedades();
    }
  }, [categoria])

  return (

    <Contenedor>
      <Head>
        <title>Ejemplo Headless CMS con Strapi y CSS</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
      </Head>
      <FiltroUI />
      <Title> Nuestras Casas y Departamentos
      </Title>
      <Propiedades />
    </Contenedor>

  )
}

export default Home
