import React from "react";
import { v4 as uuid} from 'uuid';
function Vidjets({data}) {
    return (
       <div className="vidjets-container">
        {data.map(el => 
            <div key={uuid()} className="vidjets-container__item">
                <img className="vidjets-container__item__img" src={el} alt=""></img>
            </div>
        )}
       </div>
    )
}
export default Vidjets;