// import React, { useEffect, useState } from 'react'
// import './Cards.scss'
import StellantisLogo from '../../assets/Stellantis_logo.jpg'
// // create a new component named Cards

// function Cards({keyChildren, value, onClick, isFlipped}) {
//     useEffect(() => {
//     }, [])
    
//     console.log(keyChildren)
//     return (
//         <div
//           className={`card ${isFlipped ? 'flipped' : ''}`}
//           onClick={onClick}
//         >
//           {isFlipped ? value : ''}
//           <img src="https://images.crazygames.com/basket-random/20230126094209/basket-random-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop" alt="card" />
//         </div>
//       );
// }

// export default Cards;

import React, { useEffect, useState } from 'react';
import './Cards.scss';

function Cards({ keyChildren, value, onClick, isFlipped, image, notClickable }) {
  useEffect(() => {}, []);
  // console.log({style});

  return (
    <div  className={`card ${isFlipped ? 'flipped' : ''} ${notClickable ? 'unclickable' : '' }`} onClick={onClick}>
      <div className="card-front">{isFlipped ? '' 
      : <img
      src={StellantisLogo}
      alt="card"
    />
    }</div>
      <div className="card-back">
      <img
              src={image}
              alt="card"
            />
      </div>
    </div>
  );
}

export default Cards;
