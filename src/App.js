import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Table from './Components/Table';
import Graph from './Components/Graph';

function App() {
  let [customerData, setCustomerData] = useState()
  let [transactionData, setTransactionData] = useState()
 


  function fetchData() {
    axios.get('https://habiba2002.github.io/Task/db.json').then((response) => {
      if (response.status == 200) {
        setCustomerData(response.data.customers)
        setTransactionData(response.data.transactions)
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <>
  <h2 className='p-4 display-4 text-center fst-italic'>Transactions report</h2>
    <div className='layer m-3 p-5 shadow-sm rounded-3 row justify-content-around'>
      <div className='col-md-5'>
        <Table customerData={customerData} transactionData={transactionData} setCustomerData={setCustomerData} fetchData={fetchData} />
      </div>

      <div className='col-md-5'>
        <Graph customerData={customerData} transactionData={transactionData} />
      </div>
    </div>
  </>
}

export default App;
