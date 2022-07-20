import React from 'react'
import { Container } from 'react-bulma-components'
import '../assets/sass/components/Loading.scss'

export default function Loading() {
  return (
    <Container className="SquareLoaderContainer" display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <div className="SquareLoader">
            <div className="square square1"></div>
            <div className="square square2"></div>
            <div className="square square3"></div>
            <div className="square square4"></div>
            <div className="square square5"></div>
        </div>
        <h2 className="SquareTitle">CARGANDO</h2>
    </Container>
  )
}
