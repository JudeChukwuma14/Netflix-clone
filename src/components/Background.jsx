import React from 'react'
import image from "../assets/login.jpg"
import styled from 'styled-components'
export default function Background() {
  return (
    <Container>
    <img src={image}/>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
img{
  height: 100vh;
  width: 100vw;
}
`