import React from "react"
import { navigate } from "gatsby"
import "./styles/main.css"
import Button from "@material-ui/core/Button"
import Header from "../components/Header"
import Banner from "../components/Banner"

export default function Home() {
  return (
    <>
      <Header />

      <Banner />
      <Button
        variant="outlined"
        color="secondary"
        style={{ width: "50%", marginTop: 10 }}
        onClick={() => {
          navigate("/createLolly")
        }}
      >
        Make a Lolly
      </Button>
    </>
  )
}
