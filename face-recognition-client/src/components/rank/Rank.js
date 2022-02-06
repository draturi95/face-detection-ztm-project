import React, {Component} from 'react'; 

const Rank =(props) =>{
	return (
		<div> <div className='white f3'> 
		{`Hello ${props.name}! Your rank is`}
	</div> 
	<div className='white f1'> 
		{`#${props.entries}`}
	</div>  
	</div> )
}


export default Rank; 



