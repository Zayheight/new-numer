import React, { PureComponent } from 'react';

const Item=(props)=>{
    //const name ="พักรร"
    //const amount = 6000
    const {title,amount} = props
    const {name,er} = props 
   

    return(
        <li> {title} <span> {amount} </span></li>

        

    );
}

export default  Item