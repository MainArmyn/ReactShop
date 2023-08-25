import React from "react";
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
        this.allData = {//вот те данные которые мы будем получать
            banners: [log,dostavka,log,dostavka], //я просто помню что они у нас ввиде изображения
            logoArea: {title: "название компаннии",text: "описаниеwqfwfqwfqwqwfqwf компании"},
            products: [
                {
                    variants: {
                        var1: {
                            name: "Вес",
                            options: ["100гр", "200гр"]
                        },
                        var2: {
                            name: "Вкус",
                            options: ["курица", "говядина"]
                        }
                    },
                    combos: [
                        {
                            opt1: "100гр",
                            opt2: "курица",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "200"
                        }
                    ],
            category: "cat1",
            characteristics:[{title: "Материал",value: "Сталь"},{title: "Вес",value: "500гр"}],
            id: uuid()
                },
                {
                    variants: {
                        var1: {
                            name: "Вес",
                            options: ["100гр", "200гр","10гр"]
                        },
                        var2: {
                            name: "Вкус",
                            options: ["курица", "говядина"]
                        }
                    },
                    combos: [
                        {
                            opt1: "100гр",
                            opt2: "курица",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "200"
                        },
                        {
                            opt1: "10гр",
                            opt2: "курица",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "40"
                        }
                    ],
            category: "cat1",
            characteristics:[{title: "Материал",value: "Сталь"},{title: "Вес",value: "500гр"}],
            id: uuid()
                },
                {
                    variants: {
                        var1: {
                            name: "Вес",
                            options: ["100гр", "200гр"]
                        },
                        var2: {
                            name: "Вкус",
                            options: ["курица", "говядина"]
                        }
                    },
                    combos: [
                        {
                            opt1: "100гр",
                            opt2: "курица",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "200"
                        }
                    ],
            category: "cat1",
            characteristics:[{title: "Материал",value: "Сталь"},{title: "Вес",value: "500гр"}],
            id: uuid()
                },
                {
                    variants: {
                        var1: {
                            name: "Вес",
                            options: ["100гр", "200гр","300гр"]
                        },
                        var2: {
                            name: "Вкус",
                            options: ["говдяина", "баранина","свинина"]
                        }
                    },
                    combos: [
                        {
                            opt1: "200гр",
                            opt2: "баранина",
                            img:[log,dostavka,log,dostavka],
                            name: "супер вкусная баранина",
                            text: "супер вкусная баранина и она просто чудесно тает во рту!",
                            price: "300"
                        }
                    ],
            category: "cat2",
            characteristics:[{title: "Страна производста",value: "Россия"},{title: "Срок годности",value: "3 года"}],
            id: uuid()
                }]
        }
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
    laodData = async () => {
        const response = await fetch("http://62.113.105.98:10001//api/v1/store/<store_id>/data/",{
            method: "GET",
            headers: {
                Authorization: 'BOTIQUE_2023_THE_BEST'
              }
        });
        const res = await response.text();
        console.table(res);
    }
    componentDidMount() {
        this.laodData();
    }
    render() {//в каждый компонент мы можем передать дополнительнй класс для большей кастомизации
        //таким образом можно дообвлять цвет,рамки и так далее
        return (
            <div className="shop">
                <Vidjets data={this.allData.banners}/>
                <LogoShop title={this.allData.logoArea.title} text={this.allData.logoArea.text} />
                <ItemList data={this.allData.products}/>
            </div>     
        )
    }
}
export default Shop;