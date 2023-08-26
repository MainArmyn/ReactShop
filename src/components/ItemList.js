import React from "react";
import Cart from "./Cart";
import { Fragment } from "react";
import { v4 as uuid} from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import saleIcon from '../sale-icon.png';
import ChoseClose from "./ChoseClose";
import ItemFulllScreen from "./ItemFullScreen";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


// import required modules
import { Pagination } from 'swiper/modules';
class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.className = this.props.className;
        this.color = this.props.color;
        this.dataItems = this.props.data;
        this.itemFunc = props.func;//будет принимать фукнцию для добавления в корзину которая храниться в родительком компоненте 
        this.categories = ["Все",...Array.from(new Set(this.dataItems.map(el => el.category)))];//категории формируются взависимости от переданных элементов
        this.state = {items: this.dataItems,categories: this.categories.map(item => <li key={uuid()} className="category-list__item" onClick={this.handlerForCategory}>{item}</li>),statusItem: "close",currentItem: null,listItems: "",statusBtn: "close",currentBtnText: "",cartStatus: "close"};
        this.count  = 0;
    }

    handlerForCategory = (e) => {
        let newCat = [];
        this.categories.forEach(el => {
            if (el === e.target.textContent) {
                newCat.push(<li key={uuid()} className="category-list__item category-list__item__active" onClick={this.handlerForCategory}>{el}</li>);
            } else {
                newCat.push(<li key={uuid()} className="category-list__item" onClick={this.handlerForCategory}>{el}</li>)
            }
        });
        if (e.target.textContent === "Все") {
            this.setState({categories: newCat,items: this.dataItems});
        } else {
            let newData = this.dataItems.filter(item => item.category === e.target.textContent);
            this.setState({categories: newCat,items: newData});
        }
    }//это будет обрабочик для фильтрции элементов по категориям 
    handlerToShow = (e) => {
        e.stopPropagation();
        let ident = e.currentTarget.dataset.key;
        this.dataItems.forEach(el => {
            if (el["product_id"] === ident) {
                let cheeapestId = e.currentTarget.dataset.combo;//это мы будем писать от чего то есть цена
                let cheepestCombo = el.combos.filter(item => item.id === cheeapestId)[0];
                this.setState({statusItem: "open",currentItem: [el,cheepestCombo],listItems: "list-items__non-active"});
                return;
            }
        })
    }
    handlerToReturn = (e) => {
        this.setState({statusItem: "close",currentItem: "",listItems: ""});
        let value = this.CheckAndChange();
        if (value === null) {
            return;
        } 
        this.setState({statusBtn: "open",currentBtnText: value})
        
    }

    handlerCloseCart = (e) => {
        this.setState({cartStatus: "close",listItems: ""});
        let value = this.CheckAndChange();
        if (value === null) {
            return;
        } 
        this.setState({statusBtn: "open",currentBtnText: value})
    }

    handlerOpenCart = (e) => {//не знаю зачем пока здесь это оно в себе ничего не несет
       this.setState({cartStatus: "open",listItems: "list-items__non-active",statusBtn: "close",statusItem: "close",currentItem: ""});
    }

    handlerForChose = (e) => {
        function Clear() {
            let parent = e.currentTarget.parentElement.querySelector(".list-item__chose__item__active");
            if (parent === null) {
                return;
            } 
           parent.classList.remove("list-item__chose__item__active");
        }
        e.stopPropagation();
        Clear();
        let btn = e.target.parentElement.parentElement.parentElement.children[1];
        e.target.classList.add("list-item__chose__item__active");
    }

    handlerForPopupCart = (e) => {
        if (e.target.classList.contains("popup__btn__active")) {
            let id = e.target.dataset.id;
            let choosen = e.target.parentElement.querySelector(".list-item__chose__item__active").textContent;
            if (localStorage.getItem("[]") === null) {
             let arr = [];
             arr.push({id,choosen});//здесь надо поправить что мы отправляем айди и просто выбранный размер без всего остального
             localStorage.setItem("[]",JSON.stringify(arr));
             this.setState({statusBtn: "open",currentBtnText: `Оформить заказ(${1})`})
             e.target.textContent = "Товар добавлен";
             e.target.classList.remove("popup__btn__active");
            } else {
                 let oldArr = JSON.parse(localStorage.getItem("[]"));
                 oldArr.push({id,choosen});
                 let number = oldArr.length;
                 localStorage.setItem("[]",JSON.stringify(oldArr));
                 e.target.textContent = "Товар добавлен";
                 e.target.classList.remove("popup__btn__active");
                 this.setState({statusBtn: "open",currentBtnText: `Оформить заказ(${number})`})
 
            }
         }

    }
    CheckAndChange = () => {
        let value = localStorage.getItem("[]");
        if (value === null) {
            return null;
        }
        let number = JSON.parse(value).length;
        return `Оформить заказ(${number})`
    }

    rerenderCart = () => {
        this.setState({cartStatus: "open",listItems: "list-items__non-active",statusBtn: "close",statusItem: "close",currentItem: ""});
    }

   
    render() {
        return (
            <div className="list-items-container">
            <ul className="category-list">
                {this.state.categories}
            </ul>
            <div className={`list-items ${this.state.listItems}`}>
                {this.state.items.map((item,idx) => {
                    item.combos = item.combos.filter(thing => thing.stock != 0);
                    let cheeapestPrice = Math.min.apply(null, item.combos.map(el => Number(el.price)));//это мы будем писать от чего то есть цена
                    let cheepestCombo = item.combos.filter(el => Number(el.price) === cheeapestPrice)[0];
                return <div key={item["product_id"]} className="list-item" data-key={item["product_id"]} data-combo={cheepestCombo.id} onClick={this.handlerToShow}>
                     <Swiper pagination={true} modules={[Pagination]}>
                        {cheepestCombo.photos.map(el => <SwiperSlide><img src={el} alt=""></img></SwiperSlide>)}
                    </Swiper>
                    <div className="list-item__info">
                        <div className="list-item__prices">
                            <span>{"от " + cheeapestPrice}</span>
                        </div>
                        <Popup contentStyle={{width: "300px",height: "200px"}} modal={true} trigger={<button className="list-item__btn-cart"></button>} position="bottom center">
                            <div className="popup-add-cart">
                                {Object.values(item.variants).map(el => el.options[0] === "" ? null:<ChoseClose title={el.name} categories={el.options} extraClass={"popup-chose"} func={this.handlerForChose} choosenOne={cheepestCombo}/>)}
                                <button data-id={item.id} className="popup__btn popup__btn__active" onClick={this.handlerForPopupCart}>Добавить в корзину</button>
                            </div>
                        </Popup>
                    </div>
                    <h3 className="list-item__title">{cheepestCombo.name}</h3>
                    {Object.values(item.variants).map(el => el.options[0] === "" ? null:<ChoseClose title={el.name} categories={el.options} extraClass={"popup-chose"} func={this.handlerForChose} choosenOne={cheepestCombo}/>)}
                </div>})}
            </div>
            <ItemFulllScreen data={this.state.currentItem} status={this.state.statusItem} funcToBack={this.handlerToReturn} funcToCart={this.handlerOpenCart} /> 
            <button style={this.state.statusBtn === "close" ? {transform: "scale(0)"}: {transform: "scale(1)"}} className="list-item__main-btn list-item__not-full" onClick={this.handlerOpenCart}>{this.state.currentBtnText}</button>
            <Cart allData={this.dataItems} status={this.state.cartStatus} funcToClose={this.handlerCloseCart} funcRerender={this.rerenderCart}></Cart>
        </div>
            
        )
    }
}
export default ItemList;