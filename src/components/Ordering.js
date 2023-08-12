import React from 'react';
import { Fragment } from "react";
import '../Ordering.css';
import InputMask from 'react-input-mask';


class Ordering extends React.Component {
constructor(props) {
    super(props);
    this.funcToCloseCart = this.props.funcToCloseCart;
    this.currentData = this.props.data;
    this.sum = this.props.sum;
    this.funcToRender = this.props.funcToRender;
    this.state = {formStatus: {display:"none"},display: "none",address: "",name: "",tel: "",styleName: {display: "none"},styleTel: {display: "none"}, styleAd: {display: "none"}, style1: {display: "none"}, style2: {display: "none"}, check1: false, check2: false};
    this.statusInput = false;
}
handlerOpenForm = (e) => {
    this.setState({display: "block"});
}
handlerOnchange = (event) => {
    const {name,value} = event.target;
    this.setState({[name] : value})
    }
handlerForInputFocus = (e) => {
    let el = e.target;
    if (this.statusInput) {
        return;
    } else {
        el.value = "+7" + el.value;
        this.statusInput = true;
    }
    el.placeholder = '+7 (999) 999-99-99';
}
handlerForInputBlur = (e) => {
    e.target.placeholder = "Ваш телефон";
}
handlerCloseForm = (e) => {
    this.setState({display: "none"});
}
handlerMask = (e) => {
    this.setState({display: "none"})
}

validateUsername = (username) => {
    const regex = /^[a-zA-Zа-яА-Я]+$/;
    return regex.test(username);
}

validatePhoneNumber = (phoneNumber) => {
    const regex = /^(\+7|8)?[ ]?(\(?\d{3}\)?[ ]?\d{3}[ ]?\d{2}[ ]?\d{2})$/;
    return regex.test(phoneNumber);
}



handlerValidityForm = (e) => {
    e.preventDefault()
    let name = this.validateUsername(this.state.name)
    if (name) {
      //вот здесь данные !!
      const tg = window.Telegram.WebApp
      let form = {
        name: this.state.name,
        phone: Number(this.state.tel.replace(/\D/g, '')),
        username: tg.initDataUnsafe?.user.username,
        queryID: tg.initDataUnsafe?.query_id,
      }

      fetch("https://bot.lilballerine.thebotique.ru/order/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      this.setState({styleName: {display: "none"}, styleTel: {display: "none"}})
    } else if (name === false) {
      e.target.style.gap = 5 + "px"
      this.setState({styleName: {display: "block"}})
    }
  }

handlerValidityAddress = (address) => {
    const regex = /^[а-яА-ЯёЁ\s-]+$/; // Регулярное выражение для проверки только русских букв, пробелов и дефисов

    return regex.test(address);
}

handlerCour = () => {
    if(this.state.check1){
        this.setState({style1: {display: "none"}});
        this.setState({check1: false})
    }
    else{
        this.setState({style1: {display: "inline"}});
        this.setState({check1: true});
    }
    this.setState({style2: {display: "none"}});
    this.setState({check2: false});
}

handlerPickUp = () => {
    if(this.state.check2){
        this.setState({style2: {display: "none"}});
        this.setState({check2: false});
    }
    else{
        this.setState({style2: {display: "inline"}});
        this.setState({check2: true});
    }
    this.setState({style1: {display: "none"}});
    this.setState({check1: false});
}

    render() {
        return (
        <Fragment>
        <nav className="cart__menu">
                <div className="cart__menu__actions">
                    <button onClick={() => {
                        this.funcToRender()
                        this.funcToCloseCart()}} className="cart__menu__btn list-item-full__btn">Каталог</button>
                    <button className="cart__btn-out list-item-full__btn" onClick={this.funcToRender}>Корзина</button>
                </div>
                <div className="cart__menu__info">
                </div>
            </nav>
        <form onSubmit={this.handlerValidityForm} className="order__form">
            <div className='order__form__reg'>
                <span className="order__form__reg__title">Оформление заказа</span>
                <input name="name" onChange={this.handlerOnchange} className="order__form__reg__name" type="tel" placeholder="Ваше имя" value={this.state.name} required></input>
                <span style={this.state.styleName} className="error">Неправильно введено имя можно использовать только буквы!</span>
                <InputMask value={this.state.tel} onChange={this.handlerOnchange} className="order__form__reg__tel" mask="+7 (999) 999-99-99" placeholder="+7 (___) ___-__-__" name="tel" required/>
                <input type='email' maxLength={30} className="order__form__reg__email" placeholder="Ваш e-mail"></input>
            </div>
            <div className='order__form__choose'>
                <span className="order__form__choose__title">Доставка</span>
                <div className='order__form__choose__checkbox'>
                    <label className='order__form__choose__checkbox__courier'>
                        <input onClick={this.handlerCour} type='checkbox' checked={this.state.check1}></input>
                        <span>Курьером</span>
                    </label>
                    <label className='order__form__choose__checkbox__pickup'>
                        <input onClick={this.handlerPickUp} type='checkbox' checked={this.state.check2}></input>
                        <span>Самовывоз</span>
                    </label>   
                </div>
                <input style={this.state.style1} name="address" type='text' onChange={this.handlerOnchange} value={this.state.address} maxLength={100} className="order__form__choose__address" placeholder="Адрес доставки"></input>
                <span style={this.state.styleAd} className="error">Некорректно указан адрес!</span>
                <span style={this.state.style2}>Москва, ул. Ленинградская, д. 1, офис 415 ООО чёто там</span>
            </div>
            <div className='order__form__payment'>
                <span className='order__form__payment__title'>Оплата</span>
                <span className='order__form__payment__text'>Оплата осуществляется онлайн после подтверждения заказа через СБП. Без дополнительных комиссий и сборов</span>
            </div>
            <div className='order__form__pay'>
                <div className='order__form__pay__delivery'>
                    <span>Стоимость доставки:</span>
                    <span>Бесплатно</span>
                </div>
                <div className='order__form__pay__product'>
                    <span>Стоимость товаров:</span>
                    <span>{this.sum}</span>
                </div>
                <div className='order__form__pay__all'>
                    <span>Итого:</span>
                    <span>{this.sum}</span>
                </div>
            </div>
            <label className="order__form__check__label">
                <div>
                    Оформляя заказ, вы даете согласие на <a href="#">обработку своих персональных данных</a>
                </div>   
                <input type="checkbox" className="order__form__check" required>
                </input> 
            </label>
            <button className='list-item__not-full list-item__main-btn'>Оформить заказ</button>
        </form>
        </Fragment> 
        )
    }
}
export default Ordering;