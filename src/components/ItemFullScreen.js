import React, { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Fragment } from "react";
import saleIcon from '../sale-icon.png';
import ChoseClose from "./ChoseClose";
function ItemFulllScreen({data,status,funcToBack,funcToCart}) {
    let [stat,setStat] = useState({price: "",text: "",img: ""});
    if (status === "close") {
        return null;
    }
    function BtnCartItemFull(e) {
        if (e.target.classList.contains("list-item__main-btn__active") && e.target.textContent === "Добавить в корзину") {
            let id = item.id;
            let actives = [...document.querySelector(".list-item-full").querySelectorAll(".list-item__chose__item__active")];
            let op1 = actives[0].textContent;//получаем значения наших выбарнных на данный момент штучек 
            if (actives.length === 1) {
                let info;
                item.combos.forEach(element => {
                    if (element.opt1 === op1) {
                        info = element;
                    }   
                }); 
                if (localStorage.getItem("[]") === null) {
                    let arr = [];
                    arr.push({id,info});//здесь надо поправить что мы отправляем айди и просто выбранный размер без всего остального
                    localStorage.setItem("[]",JSON.stringify(arr));
                    e.target.textContent = "Оформить заказ(1)";   
                   } else {
                        let oldArr = JSON.parse(localStorage.getItem("[]"));
                        let number = oldArr.length;
                        e.target.textContent = `Оформить заказ(${number+1})`;
                        oldArr.push({id,info});
                        localStorage.setItem("[]",JSON.stringify(oldArr));
        
                   }
            } else {
                let op2 = actives[1].textContent;
                let info;
                item.combos.forEach(element => {
                    if (element.opt1 === op1 && element.opt2 === op2) {
                        info = element;
                    }   
                });
                if (localStorage.getItem("[]") === null) {
                    let arr = [];
                    console.log("winnner");
                    arr.push({id,info});//здесь надо поправить что мы отправляем айди и просто выбранный размер без всего остального
                    localStorage.setItem("[]",JSON.stringify(arr));
                    e.target.textContent = "Оформить заказ(1)";   
                   } else {
                        let oldArr = JSON.parse(localStorage.getItem("[]"));
                        let number = oldArr.length;
                        e.target.textContent = `Оформить заказ(${number+1})`;
                        oldArr.push({id,info});
                        localStorage.setItem("[]",JSON.stringify(oldArr));
        
                   } 
            }
        } else if (e.target.textContent.includes("Оформить")){
           funcToCart();
        }
    }
    function FindUpdate() {
        let actives = [...document.querySelector(".list-item-full").querySelectorAll(".list-item__chose__item__active")];
        let op1 = actives[0].textContent;//получаем значения наших выбарнных на данный момент штучек 
        let op2 = actives[1].textContent;
        let info;
        item.combos.forEach(element => {
            if (element.opt1 === op1 && element.opt2 === op2) {
                info = element;
            }   
        });
        let el = document.querySelector(".list-item-full").querySelector(".list-item__main-btn");
        if (info === undefined) {
            el.classList.remove("list-item__main-btn__active");
            return;
        }
        el.classList.add("list-item__main-btn__active");
        setStat({price: info.price,text: info.text,img: info.img});
    }
    function ChoseClick(e) {
        function Clear() {
            let item = e.target.parentElement;
            let btns = item.querySelector(".list-item__chose__item__active");
            if (btns === null) {
                return;
            }
           btns.classList.remove("list-item__chose__item__active");
        }
        e.stopPropagation();
        Clear();
        e.target.classList.add("list-item__chose__item__active");
        FindUpdate();
    }
    let item = data[0];
    let passiveCombo = data[1];
  return (
    <div className="list-item-full">
        <div style={{display: "block"}}><Swiper pagination={true} modules={[Pagination]}
            className="mySwiper">
                {stat.img === '' ? passiveCombo.photos.map(el => <SwiperSlide><img src={el} alt=""></img></SwiperSlide>):stat.img.map(el => <SwiperSlide><img src={el} alt=""></img></SwiperSlide>)}
                <div className="list-item-full__prices">
            <span>{stat.price === '' ? passiveCombo.price:stat.price}</span>
        </div>
        </Swiper></div>
        <div className="list-item-full__btns">
            <button className="list-item-full__btn" onClick={funcToBack}>Каталог</button>
            <button className="cart__btn-out list-item-full__btn" onClick={funcToCart}>Корзина</button>
        </div>
        {Object.values(item.variants).map(el => el.options[0] === "" ? null:<ChoseClose title={el.name} categories={el.options} extraClass={"popup-chose"} choosenOne={passiveCombo} func={ChoseClick}/>)}
        <div className="list-item-full__info">
            <div className="list-item-full__text">
                <span>{stat.text === '' ? passiveCombo.text:stat.text}</span>
            </div>
            <div className="list-item-full__haractiristics">
                <h1 className="list-item-full__haractiristics__title">Основные характеристики</h1>
                {item.characteristics.map(el => <div className="list-item-full__haractiristics__item">
                    <span>{el.name}</span>
                    <span>{el.value}</span>
                </div>)}
            </div>
            <span className="list-item-full__logo">
                Магазин создан с помощью веб-сервиса <a href="">Botique</a>
            </span>
        </div>
        <button className="list-item__main-btn list-item__main-btn__active" onClick={BtnCartItemFull}>Добавить в корзину</button>
    </div>
  )
}
export default ItemFulllScreen;