import React from "react";
function LogoShop({logo,title,text}) {
    return (
        <div className="logo-shop">
            <div className="logo-shop__text">
                <h1 className="logo-shop__text__title">{title}</h1>
                <span className="logo-shop__text__description">{text}</span>
            </div>
        </div>
    )
}
export default LogoShop;