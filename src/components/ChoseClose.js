import React from "react";
function ChoseClose({title,categories,extraClass,func}) {

    return (
        <div className={`list-item__chose ${extraClass}`}>
            <span className="list-item__chose__title">{title + ":"}</span>
            <ul className="list-item__chose__list">
                {categories.map((el,idx) => <li key={idx} onClick={func} className="list-item__chose__item">{el}</li>)}
            </ul>
        </div>
    )
}
export default ChoseClose;