import React,{useState,useContext} from "react";
import axios from "axios"
import { userContext } from "../../../App";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import './login.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius:"5px",
    backgroundColor:"#F7F6F2",
    overlay: {
      backgroundColor: '#ffffff',
    },
  },
};


const Login=()=>{

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "black";
    subtitle.style.textAlign = "center";
    subtitle.style.fontFamily = "bold";
    
  }

  function closeModal() {
    setIsOpen(false);
  }



    const history = useHistory()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [status,setStatus]=useState()
  
  const tokenContext = useContext(userContext);

  
const checkValid = ()=>{
    axios
    .post("http://localhost:5000/login",{email,password})
    .then((res)=>{
        if(!res.data.success){
            return setStatus(<div>{res.data.message}</div>)
        }
        localStorage.setItem('token',res.data.token)
        tokenContext.setToken(res.data.token);
        history.push("/home")
    
    }).catch((err)=>{
        throw err
    })
      }
  
  return (
    
    <>
  
        <div >
        <button onClick={openModal} style={{backgroundColor:'#F7F6F2' , color:"black" , border:"0px" , fontWeight:"bold"}}>Login</button>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
       >
               <button onClick={closeModal} style={{backgroundColor:"gray" , borderRadius:"5px" , marginLeft:"350px" , marginTop:"1px"}}>X</button>
<div style={{textAlign:"center" , display:"grid" }}>
       <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
            
     <input type="email" placeholder="Email-here" style={{width:"150px" , marginLeft:"115px"}} onChange={(e) => {
            setEmail(e.target.value);
        }}/>
      <br />
      <input type="password" placeholder="Password Here" style={{width:"150px"  , marginLeft:"115px"}} onChange={(e) => {
            setPassword(e.target.value);
        }}/>
      <br />
      <button onClick={checkValid} style={{width:"60px" , borderRadius:"3px"  , marginLeft:"160px"}}>Login</button>
      </div>

      </Modal>
        </div>
        
        {status}
        
        </>
    )
    }
    
    export default Login
