"use client"

import Image from 'next/image'
import axios from 'axios'
import Player from './playerRow'
import { useState } from 'react'
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/material'
import plus from "../../icons/golf-plus.png"
import minus from "../../icons/golf-minus.png"


const GET_LEADERBOARD = "http://api.sportradar.us/golf/trial/pga/v3/en/2023/tournaments/1622d9c1-0ff7-4751-ae85-97ce44b95aa5/summary.json?api_key=k3xnsj9344ak5mnaft4qdccb"
const LEADERBOARD = "http://127.0.0.1:5000/leaderboard"
const PLAYER = "http://127.0.0.1:5000/player?"

// let leaderboard = await axios.get(LEADERBOARD)

function createData(
  id,
  player,
  score,
  pos
) {
  return { id, player, score, pos };
}

export default function Home() {
  const [data, setData] = useState({ data: [], playerList: [] });


  let addPlayer = async (id) => {

    let url = PLAYER + 'id=' + id

    const headers = {
      "Access-Control-Allow-Origin": "*"
    }

    let player = await axios.get(url, headers)
    
    player = createData(player.data[0][1], player.data[0][4], player.data[0][2], player.data[0][5])

    console.log(player)
    setData({ data: data.data, playerList: [player] })
    
  }

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to call

    async function getData() {
      const headers = {
        "Access-Control-Allow-Origin": "*"
      }
  
      let leaderboard = await axios.get(LEADERBOARD, headers)


      console.log (leaderboard)

      leaderboard = leaderboard.data[0].map((val, index) => {

        console.log(val, index)
        val = createData(val[1], val[4], val[2], val[5])
        return val
      })
      
      setData({ data: leaderboard, playerList: data.playerList })
      
      }
      
      getData()
    }, { data: [], playerList: [] })

    console.log("DATA", data)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
        <h2 style={{ fontSize: 30 }}>Leaderboard</h2>
      </div>
      <div style={{ position: 'fixed', width: 200, height: 'auto', minHeight: 300, background: 'white', borderRadius: 3, top: 50, left: 70 }}>
      {
          data.playerList ?
          data.playerList.map((row) => (
            <div
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <span onClick={() => addPlayer(`${row.id}`)} align="left">{row.score}</span>
              <span onClick={() => addPlayer(`${row.id}`)} align="left">{row.player}</span>
              <span onClick={() => addPlayer(`${row.id}`)} align="left">{row.pos}</span>
            </div>
          )) :
          <div>Loading</div>
        }
      </div>
    <div>
    <TableContainer sx={{ minWidth: 650, maxWidth: 1000, margin: 'auto' }} component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 1000, margin: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Player</TableCell>
            <TableCell align="left">Score</TableCell>
            <TableCell align="left">Position</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          data.data ?
          data.data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell onClick={() => addPlayer(`${row.id}`)} align="left">{row.score}</TableCell>
              <TableCell onClick={() => addPlayer(`${row.id}`)} align="left">{row.player}</TableCell>
              <TableCell onClick={() => addPlayer(`${row.id}`)} align="left">{row.pos}</TableCell>
              <TableCell align="left">
                <div style={{ display: 'flex', rowGap: 40, width: '100%' }}>
                  {
                    console.log(data)
                    // data.playerList.map((pv, cv) => {
                    //   console.log("PV", pv)
                    // })
                    // row.selected ? 
                    // <img style={{ maxHeight: 24, width: 24 }} src={minus.src} /> : 
                    // <img style={{ maxHeight: 24, width: 24 }} src={plus.src} /> 
                  }
                </div>
              </TableCell>
            </TableRow>
          )) :
          <TableRow>Loading</TableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};



