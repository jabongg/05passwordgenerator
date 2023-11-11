import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("abcDWkkj")

  //useRef hook for using reference
  const passwordRef = useRef(null);

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

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();  
    passwordRef.current?.setSelectionRange(0, length - 1);
    window.navigator.clipboard.writeText(password);
    buttonList();
  }, [password]);

  // highlight button when clicked on copy button
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  const buttonList = useCallback(() => {
    () => setActiveButtonIndex(0);
  }, []);

  
  
  return (
    <>

    <div className="w-full max-w-md mx-auto shadow-md raounded-lg x-4 my-8 text-orange-500 bg-gray-800">
    <h1 className="text-4xl text-center my-3"> Password Generator</h1>

    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={password} 
      className="outline-none w-full py-1 px-3"
      placeholder="pasSWorD"
      ref={passwordRef}
      readOnly />
      <button id="copyButton"
      onClick={copyPasswordToClipboard}
      className={activeButtonIndex === 0 ? "bg-green-700 text-white" : "bg-blue-700"}
        
      // className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0"
      >copy</button>
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
