import React from 'react'; 
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange, onButtonSubmit}) =>{
	return (
		<div className='parent'>  
		  <p className='f3'>
		    {"this is the magic baby!"}
		  </p> 
		  <div className='center'> 
		  <div className='form center pa4 shadow-5 br3'> 
          <input type='text' onChange={onInputChange} placeholder='Enter Link Here' className='f4 pa2 w-70 center'/> 
		  <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Detect</button>   
		  </div>
		  </div>  
	    </div> 
	    )
}


export default ImageLinkForm; 


{/*note we used className center to make the input and button responsive by defining .center in app.css*/}



