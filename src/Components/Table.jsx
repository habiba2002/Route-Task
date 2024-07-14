import React from 'react'

export default function Table({ customerData, transactionData, setCustomerData, fetchData }) {


    const handleSearch = (event) => {
        const filteredCustomers = customerData.filter(customer => {
            return customer.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                transactionData.filter(transaction => transaction.customer_id === customer.id)
                    .some(transaction => transaction.amount.toString().includes(event.target.value.toLowerCase()));
        });
        if (event.target.value == '') {
            fetchData()
        }
        else {
            setCustomerData(filteredCustomers);
        }
    };

    return <>
        <input type='text' placeholder='Search name or amount .......' className='w-75 form-control mb-5 py-1 bg-dark-subtle' onChange={(e) => { handleSearch(e) }} ></input>
        <table className='table text-center table-bordered'>
            <tr>
                <th>User id</th>
                <th>User name</th>
                <th>User transactions</th>
            </tr>
            {customerData?.map((customer) => <>
                <tr>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    {
                        transactionData.map((transaction) => transaction.customer_id == customer.id ? <>
                            <tr className='d-flex justify-content-center'>
                                <table className='table bg-transparent text-white'>
                                    <tr>
                                        <td>ID</td>
                                        <td>Date</td>
                                        <td>Amount</td>
                                    </tr>
                                    <tr>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                    </tr>
                                </table>
                            </tr>
                        </> : <></>)
                    }
                </tr>
            </>)}

        </table>

    </>
}
