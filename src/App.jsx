import { useState, useCallback, useEffect,useRef} from 'react'
 
import './App.css'

function App() {
  const [length,setLength]=useState(15);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  // useRef hook
  const passwordref=useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="1234567890";
    if(charAllowed) str+="~`@!#$%^&*((){}[]?<>";

    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1);
      pass += str[char];
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPassToClickBoard=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numberAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className=' outline-none w-full px-3 py-1' placeholder="password" readOnly ref={passwordref} />
          <button className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassToClickBoard}>copy</button>
        </div>
        <div  className=' flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={100} value={length} className=' cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
              <label>Lenght : {length}</label>
          </div>
          <div className=' flex text-sm gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={(e)=>{setNumberAllowed((prev)=>!prev)}} />
            <label htmlFor="numberInput">Numbers</label>

          </div>
          <div className=' flex text-sm gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id="charactorsInput" onChange={(e)=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor="charactorsInput">Charactors</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
