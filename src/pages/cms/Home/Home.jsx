import { Button } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <section className="home" style={{ minHeight: "100vh" }}>
        <div>
            <h1 style={{textAlign:"center", marginTop:"30px", fontSize:"40px"}}>Home</h1>
        </div>
        <div>
          <div style={{textAlign:"center", marginTop:"30px"}}>
            <Button variant='contained' href='/login'>Proceed to Login Page</Button>
          </div>
          <div style={{textAlign:"center", marginTop:"30px"}}>
            <Button variant='contained' href='/register'>Proceed to Register Page</Button>
          </div>
        </div>

    </section>
  )
}
