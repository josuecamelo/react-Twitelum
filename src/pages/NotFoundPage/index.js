import React from "react";
import { Link } from "react-router-dom"

export const NotFoundPage = ({location}) => {
  return (
    <div className="container">
      A URL <strong>{location.pathname}</strong> não existe no Twitelum. Se quiser, volte para a <Link to="/">página inicial.</Link>
    </div>
  )
}