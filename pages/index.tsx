import {  useEffect, useState } from "react";
import { Algo, IAccount } from "./chain/algo";
import axios from "axios";

export default function Home() {
  const algo = new Algo();

  const [account, setAccount] = useState("");
  const [reciver, setReciver] = useState({
    username: "",
    amount: "",
  });
  const [algocoin, setalgoCoin] = useState();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f66cd1d01emshd5f00aee61a4c56p16f2aejsnb029116c21a7',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const price = async () => {
    const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/TpHE2IShQw-sJ?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
    const json = await response.data;
    
    setalgoCoin(json?.data?.coin);
    console.log(algocoin)
  }


  const handleClick = (event: any) => {
    const address = event.target.value;
    console.log(address);
    algo.createAccount().then((account) => {
      console.log("the account is", account);
      setAccount(account);
      localStorage.setItem("account_value", JSON.stringify(account))
    });

  };


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("On change => ", name, "value => ", value)
    setReciver({ ...reciver(), [name]: value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(reciver);
  };


useEffect( ()=>{
  price()
}, [])

// useEffect(async() => {
//   await price()
//   setAccount(JSON.parse(localStorage.getItem("account_value")))
//   // console.log(algocoin())
// } , []);


  const getAccountDetailshandleClick = (event: any) => {
    algo.getAccount(account?.address).then((accountdetails) => {
      console.log("accountdetails", accountdetails);
    })
  };



  const transact =  (account:string|any) =>{
    algo.transactions(account.account_mnemonic).then(txs => {
      console.log("first transation", txs)

    })
  }

  function refre() {
    location.reload()
  }
  // console.log("first => ", reciver())

  return (
    <>
      <div className="pb-10 ">

        <div className=" text-center py-10 bg-gradient-to-l from-green-400 to-blue-400">
          <h1 className=" text-5xl font-thin mars">ALGORAND DAPP 1.0</h1>
        </div><hr />
        <div className="flex">
          <div className=" w-3/6 px-4 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="w-full shadow-2xl border-1 border-black-300 sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">


                <h4 className="text-xl">CREATE YOU TESTNET WALLET</h4><br></br>

                <input onChange={handleChange} type="text" className="form-input mb-2  px-4 py-2 rounded-full" name='username' placeholder="NAME"></input>
                <br></br>
                <input onChange={handleChange} type="email" className="form-input mb-2 mt-3 px-4 py-2 rounded-full" name='email' placeholder="EMAIL"></input>
                <br></br>
                <button className=" border-indigo-600 rounded-full px-4 mx-2 py-2 bg-blue-500 font-bold  text-white" onClick={(e)=>{ handleClick(e); handleSubmit(e);}} >Create Account</button>
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={getAccountDetailshandleClick}>Get Account</button> */}




              </div>
            </div>

          </div>

          <div className=" w-3/6 px-4 py-12">
            <div className="mx-auto max-w-7xl px-4 border-1 border-black-300 sm:px-6 lg:px-8 shadow-2xl sm:w-auto py-10 rounded-xl bg-white text-black">
              <span className="font-light">Wallet Address</span>
              <h4 className="text-base font-bold  border-gray-200 border- p-4 ">{account?.address} </h4><br></br>
              <span className="font-light">Wallet Amount</span>
              <p className="text-base font-bold  border-gray-200 border- p-2 ">{account?.amount}</p>
              <span className="font-light">Wallet Mnemonic</span>
              <p className="text-base font-bold  border-gray-200 border- p-4 ">{account.account_mnemonic}</p>

            </div>

          </div>


        </div>
        <div className="flex">

        <div className=" w-3/6 px-4">
            <div className="mx-auto max-w-7xl border-1 border-black-300 sm:px-6 lg:px-8 shadow-2xl sm:w-auto px-4 py-10 rounded-xl bg-white text-black">
              <h2 className="text-base font-bold  border-gray-200 border- p-2">CURRENCY INFORMATION</h2>
              {/* <table className="border-collapse border mb-4 border-slate-400 ...">
                      <thead>
                        <tr>
                          <th className="border border-slate-300 px-2 py-2...">Address</th>
                          <th className="border border-slate-300 px-2 py-2...">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 px-2 py-2 ...">{account?.address}</td>
                          

                          <td className="border border-slate-300 px-2 py-2...">{account?.amount}</td>
                        
                        </tr>
                      </tbody>
                    </table> */}

                  <img src={algocoin?.iconUrl} width='50px' className="mt-2 mb-2"></img>
                  <h2 className="pt-2 pb-2 font-light">BlockChain Name: {algocoin?.name}</h2>
                  <p className="pt-2 pb-2 font-light">Current Market Price: {algocoin?.price} $</p>
                  <p className="pt-2 pb-2 font-light">RANK:{algocoin?.rank}</p>
                  <p className="pt-2 pb-4 font-light">Market Cap: {algocoin?.fullyDilutedMarketCap}$</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={refre}>Refresh Data</button>
              </div>

          </div>
          <div className=" w-3/6 px-4 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="w-full shadow-2xl border-1 border-black-300 sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">


              <h2 className="text-base font-bold  border-gray-200 border- p-2">SEND ALGOS</h2>



              <input type="text" className="form-input px-4 py-2 rounded-full" name='account' placeholder="RECIEVER ACCOUNT"></input>
              <br></br>
              <input type="number" className="form-input mb-2 mt-3 px-4 py-2 rounded-full" name='amount' placeholder="TOTAL ALGOS"></input>
              <br></br>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={transact}>SEND</button>

                      

              </div>
            </div>

          </div>

          


        </div>
      </div>
    </>
  );
};