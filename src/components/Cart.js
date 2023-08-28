import React from "react";
import ChoseClose from "./ChoseClose";
import Popup from 'reactjs-popup';
import { Fragment } from "react";
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import Ordering from "./Ordering";
function Cart({allData,status,funcToClose,funcRerender,funcChangeStock,inserStock}) {
    function CloseAll() {
        cartSetState({display: "flex"})
        setState({display: "none"})
    }
    function removeOnce(array, value) {
        const index = array.findIndex((element) => element.id === value.id && element.info.id === value.info);
        if (index !== -1) {
          array.splice(index, 1);
        }
        return array;
      }

      function addAndInsert(array, value) {
        let result;
        const index = array.findIndex((el) => el.id === value.id && el.info.id === value.info);
        array.forEach(thing => {
            if (thing.id === value.id && thing.info.id === value.info)   {
                result = thing;
            }
        })
        if (index !== -1) {
          array.splice(index + 1, 0, result);
        } else {
          array.push(result);
        }
        return array;
      }

      
    

    function FindCorrect(id) {
        let info;
        allData.forEach(el => {
            if (el["product_id"] === id) {
                info = el;
            }
        })
        return info;
    }

    function handlerForPlus(e) {
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;//это продукта 
        let info =  e.target.parentElement.parentElement.parentElement.parentElement.dataset.info;
        if (funcChangeStock(id,info,"-") === false) {
            return;
        }
        let items = JSON.parse(localStorage.getItem("[]"));
        let newArr = addAndInsert(items,{id,info});
        localStorage.setItem("[]",JSON.stringify(newArr));
        funcRerender();
    }
    function handlerForMinus(e) {
        if (e.target.parentElement.children[1].textContent === "1") {
            return;
        } 
        let items = JSON.parse(localStorage.getItem("[]"));
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let info =  e.target.parentElement.parentElement.parentElement.parentElement.dataset.info;
        let count  = e.target.parentElement.parentElement.parentElement.parentElement.dataset.count;
        let value = {id,info};
        let newArr = removeOnce(items,value);
        console.log(newArr);
        funcChangeStock(id,info,"+");
        inserStock(id,info,1);
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
          if (element.id === value.id && element.info.id === value.info) {
            array.splice(i, 1);
          }
        }
        
        return array;
      }
        

    function DeleteItem(e) {
        let items = JSON.parse(localStorage.getItem("[]"));
        let id = e.target.parentElement.dataset.id;
        let info = e.target.parentElement.dataset.info;
        let howManyTimes = Number(e.target.parentElement.dataset.count);
        funcChangeStock(id,info,"+",howManyTimes);
        inserStock(id,info,howManyTimes);
        let value = {id,info};
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
        funcToClose();
        return null;
    }
    let number = currentData.length;
    currentData.forEach(thing => delete thing.info.stock)//важно при подсчете не учитывать количество на складе потому что так нужно
    console.log(currentData);
   const clearInfo = countOccurrences(currentData);//вот здесь все окей данные просто краисво счиатются
   let sum = 0;//формируем сумму всей покупки
   clearInfo.forEach(el => {//вот тут формируем
    let priceForOne = el.element.info.price
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
                {clearInfo.map((item,idx,arr) => {
                    let id = item.element.id;
                    let info = item.element.info;
                    let supreme = FindCorrect(id);
                    return (
                        <div className={`cart__list__item ${idx === arr.length - 1 ? 'cart__list__item__last' : ''}`} data-id={id} data-info={info.id} data-count={item.count}>
                            <button className="cart__list__item__delete" onClick={DeleteItem}></button>
                    <div className="cart__list__item__img-category">
                        <img src={info.photos[0]} className="cart__list__item__img" alt=""></img>
                        <div style={{display: "flex",flexDirection: "column"}}>
                            {Object.values(supreme.variants).map((thing,idx) => thing.options[0] === "" ? null:<ChoseClose title={thing.name} categories={[Object.values(info)[idx+1]]} extraClass={"cart__list__item__category"}/>)}
                        </div>
                    </div>
                    <span className="cart__list__item__title">{info.name}</span>
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
                                <span className="cart__list__item__all-price">{Number(info.price)*item.count}</span>
                            </div>
                            
                        </div>
                        {item.count > 1 ? <span className="cart__list__item__current-price">{info.price}
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