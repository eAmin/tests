import React, { useState, useEffect } from 'react';
import './App.css';
import { users, products } from './data';

function App() {
  const [order, setOrder] = useState([]);

  function add() {
    for (let i = 1; i < 11; i++) {
      let prandom = Math.floor(Math.random() * 6);
      let pcount = Math.floor(Math.random() * 9) + 1;
      setOrder(prev => {
        return [...prev, {
          id: i,
          user_id: users[Math.floor(Math.random() * 3)].id,
          product_id: products[prandom].id,
          count: pcount,
          total_amount: products[prandom].amount * pcount,
        }]
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={add}>Random</button>
        <Table order={order}/>
      </header>
    </div>
  );
}

function Table({order}) {
  const [arr, setArr] = useState([]);
  const a = [];

  order.map((i) => {
    a.push(
      {
        id: i.id,
        fname: users[i.user_id].fname,
        lname: users[i.user_id].lname,
        pname: products[i.product_id].name,
        count: i.count,
        total_amount: i.total_amount,
      },
    );
  });


  // START: Soloution 1
  // generic comparison function
  const cmp = function(x, y){
    return x > y ? 1 : x < y ? -1 : 0; 
  };

  arr.sort(function(a, b){
    //note the minus before -cmp, for descending order
    return cmp( 
        [cmp(a.lname, b.lname), -cmp(a.total_amount, b.total_amount), cmp(a.count, b.count)], 
        [cmp(b.lname, a.lname), -cmp(b.total_amount, a.total_amount), cmp(a.count, b.count)]
    );
  });
  // END: Soloution 1



  // START: Soloution 2
  // arr.sort((a, b) => {
  //   if (a.total_amount > b.total_amount) {
  //     return -1;
  //   }

  //   if (a.total_amount === b.total_amount) {
  //     return a.count - b.count;
  //   }
  // });

  // arr.sort((a, b) => {
  //   if (a.lname < b.lname) {
  //     return -1;
  //   }
  // });
  // END: Soloution 2

  useEffect( () => {
    setArr([...a])
  }, [order])

  return (
    <>
    <table style={{marginTop: 40}}>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Product Name</th>
            <th>Count</th>
            <th>Total Amount</th>
          </tr>
          {arr.map((i) => {
            return (
              <tr>
                <td>{i.id}</td>
                <td>{i.fname}</td>
                <td>{i.lname}</td>
                <td>{i.pname}</td>
                <td>{i.count}</td>
                <td>{i.total_amount}</td>
              </tr>
            )
          })}
        </table>
      </>
  )
}

export default App;
