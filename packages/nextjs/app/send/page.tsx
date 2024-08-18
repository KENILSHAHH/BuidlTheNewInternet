/** @format */
"use client"
import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import preferenceabi from '../abi/preferenceabi.json';
import bridge from '../abi/bridgeabi.js';
const preferenceAddress = '0x759E4e020501486092dd414bfe8D9ed91186B4Cd';

export default function SendAssets() {
  const [enteredAddress, setEnteredAddress] = useState('');
  const [receiverChain, setReceiverChain] = useState('');
  const [assetpref , setAssetpref] = useState('')
  const [preference, setPreference] = useState([]);
  const [correctAddress, setCorrectAddress] = useState('');
const [inputValue, setInputValue] = useState(BigNumber.from(0));
  const [amount, setAmount] = useState(['']);

 
  const handleInputChange = async (e:any) => {
    setEnteredAddress(e.target.value);
  };
    const handleValueChange = async (e: any) => {
        const amount = e.target.value
        const tokenAmount = ethers.utils.parseEther(amount)
    setInputValue(tokenAmount);
    }

  async function checkAddress() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      preferenceAddress,
      preferenceabi,
      signer
    );
    const txn = await contract.getPrimaryAddress(enteredAddress);
    const pref = await contract.getUserPreferences(txn);
    console.log(pref);
    setPreference(pref);
    
  }
 
  const bridgeAssets = async (event:any) => {
    event.preventDefault();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer =  provider.getSigner();
    const bridgeasset = new ethers.Contract(
      '0x528e26b25a34a4a5d0dbda1d57d318153d2ed582',
      bridge,
      signer
    );
    console.log(preference)
      const bridgeass = await bridgeasset.bridgeAsset(
          1,
          preference[0],
          inputValue,
          preference[3],
          true,
          '0x',
          {
              value: inputValue
          }
      )
        console.log(bridgeass)

          
   
   
  };

  return (
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          fontSize: '30px',
        }}>
        Send Assets
      </h1>
      <form
        onSubmit={bridgeAssets}
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
        }}>
        <div>
          <div
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"
            style={{
              border: '1px solid #000000',
              borderRadius: '10px', // Adjust this value to control the roundness
              padding: '10px',
            }}>
            <div className="p-4">
              <div className="sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Enter Receiver address
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    autoComplete="given-name"
                    onChange={handleInputChange}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    onClick={checkAddress}
                    className="px-3 mt-4 py-2 bg-blue-500 text-white rounded-md">
                    Check if the address is correct
                  </button>
                </div>
              </div>

              <>
                {' '}
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Receiver's preferred address
                </label>
                <div className="flex items-center mb-2">
                  <div className="w-128 p-2 border rounded-md mr-2">
                    {correctAddress}
                  </div>
                  <input
                    type="text"
                    placeholder="1 GHO"
                    onChange={handleValueChange}
                    className="w-16 p-2 border rounded-md mr-2"
                  />
                </div>
              </>
            </div>
            <button
              onClick={bridgeAssets}
              className="px-3 py-2 ml-4 mr-6 bg-green-500 text-white rounded-md">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}