import React, {Component} from 'react'; 
import 'tachyons'; 

const Navigation =({onRouteChange, isSignedIn}) =>{
		if(isSignedIn){
			return(
				<nav style={{display : 'flex', justifyContent : 'flex-end'}}>
				<p className='f3 link dim black pa3 pointer' onClick={() =>  onRouteChange('signout')}> 
					Sign out 
				</p>
				</nav>
		)
		}
		else{
			return(				
				<nav style={{display : 'flex', justifyContent : 'flex-end'}}>
				<p className='f3 link dim black pa3 pointer' onClick={() =>  onRouteChange('signin')}> 
					Sign In 
				</p>
				<p className='f3 link dim black pa3 pointer' onClick={() =>  onRouteChange('register')}> 
					Register
				</p>
				</nav>

				)
		}

		
}


export default Navigation; 


//Remember when you needed to put a button on the right end? Use style={{display : 'flex', justifyContent : 'flex-end'} 
// as used here for sign out

