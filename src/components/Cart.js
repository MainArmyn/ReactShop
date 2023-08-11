import React from "react";
import ChoseClose from "./ChoseClose";
import Popup from 'reactjs-popup';
import { Fragment } from "react";
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import Ordering from "./Ordering";
function Cart({allData,status,funcToClose,funcRerender}) {
    function CloseAll() {
        cartSetState({display: "flex"})
        setState({display: "none"})
    }
    function removeOnce(array, value) {
        const index = array.findIndex((element) => element.id === value.id && element.choosen === value.choosen);
        if (index !== -1) {
          array.splice(index, 1);
        }
        return array;
      }

      function addAndInsert(array, element) {
        const index = array.findIndex((el) => el.id === element.id && el.name === element.name);
        if (index !== -1) {
          array.splice(index + 1, 0, element);
        } else {
          array.push(element);
        }
        return array;
      }

      
    

    function FindCorrect(id) {
        let info;
        allData.forEach(el => {
            if (el.id === id) {
                info = el;
            }
        })
        return info;
    }

    function handlerForPlus(e) {
        let items = JSON.parse(localStorage.getItem("[]"));
        let choosen = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".list-item__chose__item").textContent;
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let newArr = addAndInsert(items,{id,choosen})
        localStorage.setItem("[]",JSON.stringify(newArr))
        funcRerender();
    }
    function handlerForMinus(e) {
        if (e.target.parentElement.children[1].textContent === "1") {
            return;
        } 
        let items = JSON.parse(localStorage.getItem("[]"));
        let choosen = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".list-item__chose__item").textContent;
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let value = {id,choosen};
        let newArr = removeOnce(items,value);
        console.log(newArr);
        localStorage.setItem("[]",JSON.stringify(newArr));
        funcRerender();
    }

    function countOccurrences(array) {
        let counts = {};
      
        for (let i = 0; i < array.length; i++) {
          const element = JSON.stringify(array[i]);
      
          if (counts[element] === undefined) {
            counts[element] = { element: array[i], count: 1 };
          } else {
            counts[element].count++;
          }
        }
      
        const occurrences = Object.values(counts);
        return occurrences;
      }

      function removeDuplicates(array, value) {
        for (let i = array.length - 1; i >= 0; i--) {
          const element = array[i];
          if (element.id === value.id && element.choosen === value.choosen) {
            array.splice(i, 1);
          }
        }
        
        return array;
      }
        

    function DeleteItem(e) {
        let items = JSON.parse(localStorage.getItem("[]"));
        let choosen = e.target.parentElement.querySelector(".list-item__chose__item").textContent;
        let id = e.target.parentElement.dataset.id;
        let value = {id,choosen};
        let newArr = removeDuplicates(items,value);
        localStorage.setItem("[]",JSON.stringify(newArr));
        funcRerender();

    }

    function OpenForm(e) {
        setState({display: "flex"});
        cartSetState({display: "none"});
    }
      
      
      
    let [state,setState] = useState({display: "none"});
    let [cartState,cartSetState] = useState({display: "flex"});
    const currentData = localStorage.getItem("[]") === null ? null:JSON.parse(localStorage.getItem("[]"));
    if (status === "close") {
        return null
    }
    if (currentData === null) {
        alert("Товаров в коризне нету!");
        return null
    }
    let number = currentData.length;
   const clearInfo = countOccurrences(currentData);
   console.log(clearInfo)
   let sum = 0;//формируем сумму всей покупки
   clearInfo.forEach(el => {//вот тут формируем
    let priceForOne;
    allData.forEach(item => {
        if (item.id === el.element.id) {
            priceForOne = item.newPrice;
        }
    })
    sum+=(el.count)*Number(priceForOne)
   }) 
    return  (
        <Fragment>
        <div className="cart list-item-full">
            <nav className="cart__menu" style={cartState}>
                <div className="cart__menu__actions">
                    <button onClick={funcToClose} className="cart__menu__btn list-item-full__btn">Каталог</button>
                    <span className="cart__btn-out cart__menu__title">
                        Корзина
                    </span>
                </div>
                <div className="cart__menu__info">
                    <span>Итого:</span>
                    <span>{sum}</span>
                </div>
            </nav>

            <div className="cart__list shop" style={cartState}>
                {clearInfo.map(item => {
                    let id = item.element.id;
                    let info = FindCorrect(id);
                    return (
                        <div className="cart__list__item" data-id={id}>
                            <button className="cart__list__item__delete" onClick={DeleteItem}></button>
                    <div className="cart__list__item__img-category">
                        <img src={info.img[0]} className="cart__list__item__img" alt=""></img>
                        <ChoseClose title={"Размер"} categories={[item.element.choosen]} extraClass={"cart__list__item__category"}/>
                    </div>
                    <span className="cart__list__item__title">{info.title}</span>
                    <div className="cart__list__item__prices">
                        <div className="cart__list__item__prices-container">
                            <div className="cart__list__item__count-container">
                                <button onClick={handlerForMinus} className="cart__list__item__count-">-
                                </button>
                                <button className="cart__list__item__count">{item.count}
                                </button>
                                <button onClick={handlerForPlus} className="cart__list__item__count-plus">+   
                                </button>
                            </div>
                            <div>
                                <span className="cart__list__item__all-price">{Number(info.newPrice)*item.count}</span>
                                {info.oldPrice === undefined ? null:<span className="cart__list__item__oldPrice">{Number(info.oldPrice)*item.count}</span>}
                            </div>
                            
                        </div>
                        {item.count > 1 ? <span className="cart__list__item__current-price">{info.newPrice}
                        </span>:null}
                    </div>
                </div>
                    )
                })}
                 <button className="cart__btn list-item__main-btn" onClick={OpenForm}>Оформить заказ({number})</button>
            </div>
            <div style={state}>
                <Ordering funcToCloseCart={funcToClose} funcToRender={CloseAll} sum={sum} data={currentData}/>
            </div>
            
        </div>
        </Fragment>
    ) 
}
export default Cart;