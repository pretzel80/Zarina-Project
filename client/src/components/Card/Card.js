import React from 'react';
import style from './Card.module.scss';
import DelIcon from '../DelIcon/DelIcon';


const Card = props => {
  return (
    <div id={props.id} className={style.productCard}>
      {props.delIcon ? (
        <DelIcon
          id={props.card._id}
          className={style.delIcon}
          func={props.delProd}
        />
      ) : null}

      <img
        src={props.card.imageUrls[0]}
        style={{ width: 100 }}
        alt={props.card.brand + ' ' + props.card.name}/>
      <div>
        <h3>{props.card.name}</h3>
        <p className={style.productArticle}>Article no: {props.card.itemNo}</p>
      </div>
      <p>Price: {props.card.currentPrice}$</p>

      <select>
        <option defaultValue>{props.qty}</option>
        <option value="1">Test</option>
        <option value="2">Test 2</option>
      </select>
    </div>
  );
};

export default Card;
