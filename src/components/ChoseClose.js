import React from "react";
function ChoseClose({title,categories,extraClass,func,choosenOne}) {
    if (choosenOne === undefined) {
        return <div className={`list-item__chose ${extraClass}`}>
            <span className="list-item__chose__title">{title + ":"}</span>
            <ul className="list-item__chose__list">
                {categories.map((el,idx) =><li key={idx} onClick={func} className="list-item__chose__item">{el}</li>)}
            </ul>
        </div>
    }
    return (
        <div className={`list-item__chose ${extraClass}`}>
            <span className="list-item__chose__title">{title + ":"}</span>
            <ul className="list-item__chose__list">
                {categories.map((el,idx) => (el == choosenOne.opt1) || (el == choosenOne.opt2)  ? <li key={idx} onClick={func} className="list-item__chose__item list-item__chose__item__active">{el}</li> : <li key={idx} onClick={func} className="list-item__chose__item">{el}</li>)}
            </ul>
        </div>
    )
}
export default ChoseClose;