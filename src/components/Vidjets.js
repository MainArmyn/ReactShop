import React from "react";
import styled from "styled-components";
import { v4 as uuid} from 'uuid';
function Vidjets({data}) {
    return (
       <div className="vidjets-container">
        {data.map(el => 
            <div key={uuid()} className="vidjets-container__item">
                <img className="vidjets-container__item__img" src={el.src} alt=""></img>
                <span className="vidjets-container__item__text">{el.text}</span>
            </div>
        )}
       </div>
    )
}
export default Vidjets;