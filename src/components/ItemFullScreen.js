import React, { useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Fragment } from "react";
import saleIcon from '../sale-icon.png';
import ChoseClose from "./ChoseClose";
function ItemFulllScreen({item,status,funcToBack,funcToCart}) {
    if (status === "close") {
        return null;
    }
    function BtnCartItemFull(e) {
        if (e.target.classList.contains("list-item__main-btn__active") && e.target.textContent === "Добавить в корзину") {
            let id = item.id;
            let choosen = e.target.parentElement.querySelector(".list-item__chose__item__active").textContent;
           if (localStorage.getItem("[]") === null) {
            let arr = [];
            arr.push({id,choosen});//здесь надо поправить что мы отправляем айди и просто выбранный размер без всего остального
            localStorage.setItem("[]",JSON.stringify(arr));
            e.target.textContent = "Оформить заказ(1)";   
           } else {
                let oldArr = JSON.parse(localStorage.getItem("[]"));
                let number = oldArr.length;
                e.target.textContent = `Оформить заказ(${number+1})`;
                oldArr.push({id,choosen});
                localStorage.setItem("[]",JSON.stringify(oldArr));

           }
        } else if (e.target.textContent.includes("Оформить")){
           funcToCart();
        }
    }
    function ChoseClick(e) {
        function Clear() {
            let item = document.querySelector(".list-item-full");
            let btns = item.querySelector(".list-item__chose__item__active");
            if (btns === null) {
                return;
            } 
           btns.classList.remove("list-item__chose__item__active");
        }
        e.stopPropagation();
        Clear();
        let btn  = document.querySelector(".list-item__main-btn");
        btn.classList.add("list-item__main-btn__active");
        e.target.classList.add("list-item__chose__item__active");
    }
  return (
    <div className="list-item-full">
        <div style={{display: "block"}}><Swiper pagination={true} modules={[Pagination]}
            className="mySwiper">
                {item.img.map(el => <SwiperSlide><img src={el} alt=""></img></SwiperSlide>)}
                <div className="list-item-full__prices">
            <span>{item.newPrice}</span>
            {item.oldPrice === undefined ? null:<span>{item.oldPrice}</span>}
        </div>
        </Swiper></div>
        <div className="list-item-full__btns">
            <button className="list-item-full__btn" onClick={funcToBack}>Каталог</button>
            <button className="cart__btn-out list-item-full__btn" onClick={funcToCart}>Корзина</button>
        </div>
        {item.oldPrice === undefined ? null:<img className="list-item__sale list-item-full__sale" src={saleIcon} alt=""></img>}
        <ChoseClose title={"Размеры"} categories={item.variants} func={ChoseClick}/>
        <div className="list-item-full__info">
            <div className="list-item-full__text">
                <span>{item.text}</span>
            </div>
            <div className="list-item-full__haractiristics">
                <h1 className="list-item-full__haractiristics__title">Основные характеристики</h1>
                {item.haracteristics.map(el => <div className="list-item-full__haractiristics__item">
                    <span>{el.title}</span>
                    <span>{el.value}</span>
                </div>)}
            </div>
            <div className="list-item-full__text">
                <span>Запишись на бесплатное пробное занятие</span>
            </div>
            <span className="list-item-full__logo">
                Магазин создан с помощью веб-сервиса <a href="">Botique</a>
            </span>
        </div>
        <button className="list-item__main-btn" onClick={BtnCartItemFull}>Добавить в корзину</button>
    </div>
  )
}
export default ItemFulllScreen;