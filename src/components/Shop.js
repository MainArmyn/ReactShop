import React from "react";
import styled from "styled-components";
import Vidjets from "./Vidjets";
import ItemList from "./ItemList";
import LogoShop from "./LogoShop";
import dostavka from "../dostavka.svg";
import { v4 as uuid} from 'uuid';
import log from "../Flower.svg";
class Shop extends React.Component {
    constructor(props) {//я решил что пусть у магазина будет один цвет и он будет указыаться при создании
        super(props);
        localStorage.clear();
        this.dataVidjets = [{src: dostavka,text: "Бесплатная доставка от 2000 ₽"},
        {src: dostavka,text: "Бесплатная доставка от 2000 ₽"},
        {src: dostavka,text: "Бесплатная доставка от 2000 ₽"},
        {src: dostavka,text: "Бесплатная доставка от 2000 ₽"}
    ];//данные для виджетов
    this.cart = [];//это будет корзина нашего пользователя есть вариант хранить корзину в локалном хранилище но пока думаю над этим
    this.dataLogo = {logo: log,
        text: "Интернет-магазин цветов для вас! Более 500 видов цветов и готовых композиций ..."
    ,title: "Flower Boutique"};//данные для логотипа и для навзвния магазина
        
        this.storeData = [{img:[log,dostavka,log,dostavka],
            id: uuid(),
            variants: ['25','34','21','23','45'],
            title: "Корм для щенков всех пород Pedigree с курицей1",
            text: "ewfiemfinwefnuejfwefnwjefejnfjkwnejkfnwejfnwejfn jweknwejfnwejfnwejkfnw jnwc dsmc dsm jwenfjwe jwnefjkenvjwkn jwnekwjenvjweknv jwnevwjken wjenvjwevnwjv",
            category: "cat1",
            newPrice: "4000",
            oldPrice: "5000",
            haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
            {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
            {img:[log,dostavka,log,dostavka],
                id: uuid(),
                variants: ['25','34','21','23','45'],
                title: "Корм для щенков всех пород Pedigree с курицей2",
                text: "ewfiemfinwefnuejfwefnwjefejnfjkwnejkfnwejfnwejfn jweknwejfnwejfnwejkfnw jnwc dsmc dsm jwenfjwe jwnefjkenvjwkn jwnekwjenvjweknv jwnevwjken wjenvjwevnwjv",
                category: "cat1",
                newPrice: "4000",
                oldPrice: "5000",
                haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
                {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
                {img:[log,dostavka,log,dostavka],
                    id: uuid(),
                    variants: ['25','34','21','23','45'],
                    title: "Корм для щенков всех пород Pedigree с курицей3",
                    text: "ewfiemfinwefnuejfwefnwjefejnfjkwnejkfnwejfnwejfn jweknwejfnwejfnwejkfnw jnwc dsmc dsm jwenfjwe jwnefjkenvjwkn jwnekwjenvjweknv jwnevwjken wjenvjwevnwjv",
                    category: "cat1"
                    ,newPrice: "4000",
                    haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},{title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
                    {img:[log,dostavka,log,dostavka],
                        id: uuid(),
                        variants: ['25','34','21','23','45'],
                    title: "Корм для щенков всех пород Pedigree с курицей",
                    text: "ewfiemfinwefnuejfwefnwjefejnfjkwnejkfnwejfnwejfn jweknwejfnwejfnwejkfnw jnwc dsmc dsm jwenfjwe jwnefjkenvjwkn jwnekwjenvjweknv jwnevwjken wjenvjwevnwjv",
                    category: "cat2",
                    newPrice: "4000",
                    oldPrice: "5000",haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
                    {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
                    {img:[log,dostavka,log,dostavka],
                        id: uuid(),
                        variants: ['25','34','21','23','45'],
                        title: "hii",
                        text: "hfeuhfuwhfwheufwe",
                        category: "cat3",
                        newPrice: "4000",haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
                        {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
                        {img:[log,dostavka,log,dostavka],
                            id: uuid(),
                            variants: ['25','34','21','23','45'],
                            title: "hii",
                            text: "hfeuhfuwhfwheufwe",
                            category: "cat5",
                            newPrice: "4000",haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
                            {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]},
                            {img:[log,dostavka,log,dostavka],
                                id: uuid(),
                                variants: ['25','34','21','23','45'],
                                title: "Корм для щенков всех пород Pedigree с курицей",
                                text: "hfeuhfuwhfwheufwe"
                                ,category: "cat5"
                                ,newPrice: "4000",haracteristics: [{title: "Срок годности",value: "3"},{title: "Вес",value: "500гр"},
                                {title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}]}];
    }
    handlerAddToCart = (e) => {//это будет функция для добавления элементов в коризину
        let text = e.target.textContent;
        this.cart.push(text);
        console.log(this.cart);
    }
    render() {//в каждый компонент мы можем передать дополнительнй класс для большей кастомизации
        //таким образом можно дообвлять цвет,рамки и так далее
        return (
            <div className="shop">
                <Vidjets data={this.dataVidjets}/>
                <LogoShop logo={this.dataLogo.logo} title={this.dataLogo.title} text={this.dataLogo.text} />
                <ItemList color={this.color} data={this.storeData} />
            </div>     
        )
    }
}
export default Shop;