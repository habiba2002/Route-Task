import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js/auto';

export default function Graph({ customerData, transactionData }) {
    let [labels, setLables] = useState([])
    let [amount, setAmount] = useState([])

    defaults.font.family = 'Georgia'
    function Drawchart(info) {
        let selectedCustomerID = customerData.filter((customer) => customer.name == info.target.value)[0].id
        let selectedCustomerTransactions = transactionData.filter((transaction) => transaction.customer_id == selectedCustomerID)
        setLables([...new Set(selectedCustomerTransactions.map((transaction) => transaction.date))])
        let amountArr = [];
        for (var i = 0; i < labels.length; i++) {
            amountArr.push(selectedCustomerTransactions.filter((transaction) => transaction.date == labels[i]))
        }
        let dataArray = [];
        let sum = 0
        for (var i = 0; i < amountArr.length; i++) {
            for (var j = 0; j < amountArr[i].length; j++) {
                sum = sum + amountArr[i][j].amount
            }
            dataArray.push(sum)
            sum = 0
        }
        console.log(dataArray)
        setAmount(dataArray)
    }

    return <>
        <div className='h-100'>
            <select name="customers" id="customers" className='w-75 form-control mb-5 py-1 bg-dark-subtle' onChange={(e) => Drawchart(e)}>
                <option disabled selected value> Select customer </option>
                {
                    customerData?.map((customer) => <>
                        <option value={customer.name} >{customer.name}</option>
                    </>)
                }
            </select>
            <div className='d-flex justify-content-center h-100 align-items-center'>
                <Bar
                    
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Total amount",
                                data: amount,
                                backgroundColor: [
                                   'rgba(153, 102, 255, 0.3)',
                                ],
                                borderWidth: 1
                            }
                        ]
                    }}
                />

            </div>

        </div>



    </>
}
