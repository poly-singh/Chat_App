import Navbar from "../../components/navbar/Navbar";
import React from "react";
// import { useQuery } from '@apollo/client';

export default function chatHomepage( {user}) {
  console.log(user)
  return (
  <div>
    <Navbar />
    <h1>Hello</h1>
  </div>
);
}

