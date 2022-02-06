import React, {Component} from 'react'; 
import Tilt from 'react-tilt';
import './Logo.css'; 
import brain from './brain.png'; 

const Logo =() =>{
	return (<div className='ma4 mt0'> 
<Tilt className="Tilt" options={{ max : 45 }} style={{ height: 164, width: 164 }} >
 <div className="Tilt-inner  shadow-2 pa3"> <img style={{paddingTop : "5px"}} height='120px' width='auto' alt='logo' src={brain}/> </div>
</Tilt>
	</div>  )
}


export default Logo; 




