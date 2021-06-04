import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => { // pass status for route state and issignedin
    if (isSignedIn) { // if signed in show sign out link
        return (
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>    
        </nav>
        );
    } else {
        return ( // if not signed in show register/sign in links
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>    
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>    
            </nav>
        );
    }
}

export default Navigation;