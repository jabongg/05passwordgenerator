import { useCallback, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("abcDWkkj")

  //useCallback cache a function definiton for multiple times call
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "~!@#$%^&*()-="
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
      passGenerator();
  }, [length, numberAllowed, characterAllowed, passGenerator]);

  return (
    <>

    <div className="w-full max-w-md mx-auto shadow-md raounded-lg x-4 my-8 text-orange-500 bg-gray-800">
    <h1 className="text-4xl text-center my-3"> Password Generator</h1>

    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={Password} 
      className="outline-none w-full py-1 px-3"
      placeholder="pasSWorD"
      readOnly />
      <button className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0">copy</button>
      </div>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="range" 
      value={length} 
      className="cursor-pointer"
      min={8}
      max={24} 
      onChange={(e) => {setLength(e.target.value)}}
      />
      <label>Length : {length} </label>
      </div>


      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="checkbox" 
      value={length} 
      defaultChecked={numberAllowed}
     id="numberInput"
      max={24} 
      onChange={() => {setNumberAllowed((prev) => !prev)}}
      />
      <label htmlFor='numberInput'>Numbers</label>
      </div>


      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="checkbox" 
      value={length} 
      defaultChecked={characterAllowed}
     id="charInput"
      onChange={() => {setCharacterAllowed((prev) => !prev)}}
      />
      <label htmlFor='charInput'>Characters</label>
      </div>
    </div>
     
    </>
  )
}

export default App
