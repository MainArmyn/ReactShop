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
                        },
                        {
                            opt1: "200гр",
                            opt2: "курица",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "100"
                        },
                        {
                            opt1: "200гр",
                            opt2: "говядина",
                            name: "корм со вкусом курицы",
                            img:[log,dostavka,log,dostavka],
                            text: "он такой вкусный и притяный чудесный корм ураа",
                            price: "300"
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
        this.store =
        {
            store_info: {
                store_id: "c76e1153-b598-46ab-8344-4f8ae48c433b",
                name: "Магазин всего",
                description: "Магазина просто всего: купите что хотите! В продаже все от China каров до вкуснейшнимй хинкаль!",
                delivery_type: "delivery",
                delivery_option: "Самарская область"
            },
            banners: [
                {
                    link_to_product_id: "",
                    text: "Забегай к нам, если устал сидеть дома! Почувствуй себя в гостях - всего 200 км от города за границей",
                    sort: 1,
                    img: log
                },
                {
                    link_to_product_id: "",
                    text: "Забегай к нам, если устал сидеть дома! Почувствуй себя в гостях - всего 200 км от города за границей",
                    sort: 1,
                    img: dostavka
                },
                {
                    link_to_product_id: "",
                    text: "Забегай к нам, если устал сидеть дома! Почувствуй себя в гостях - всего 200 км от города за границей",
                    sort: 1,
                    img: log
                }
            ],
            products: [
                {
                    product_id: "2541bfb9-6711-45c2-8f63-8b009d8e4572",
                    category: "Спорт и отдых",
                    subcategory: "Скейтбординг",
                    characteristics: [
                        {
                            name: "Применение",
                            value: "Трюки"
                        },
                        {
                            name: "Страна-изготовитель",
                            value: "США"
                        }
                    ],
                    variants: {
                        var1: {
                            name: "Размер",
                            options: [
                                
                                    "31",
                                    "32"
                                
                            ]
                        },
                        var2: {
                            name: "Материал",
                            options: [
                                
                                    "Канадский клен","Сталь"
                                
                            ]
                        }
                    },
                    combos: [
                        {
                            id: "57b59c18-9d30-4d80-b426-4fbdcf7dbf60",
                            name: "Скейт",
                            text: "Новый крутой",
                            old_price: "0.00",
                            price: "0.00",
                            stock: 0,
                            photos: []
                        },
                        {
                            id: "b631cde7-bb1b-4998-abc2-2a7baa431838",
                            opt1: "32",
                            opt2: "Канадский клен",
                            name: "Скейт",
                            text: "Новый крутой",
                            old_price: "2699",
                            price: "2429",
                            stock: 3,
                            photos: [log,dostavka,log]
                        },
                        {
                            id: "8da61337-839a-485b-b016-ca0316ca10ce",
                            opt1: "31",
                            opt2: "Канадский клен",
                            name: "Скейт",
                            text: "Новый крутой!",
                            old_price: "3699.00",
                            price: "3329.10",
                            stock: 3,
                            photos: [log,dostavka,log]
                        }
                    ]
                },
                {
                    product_id: "a2e478b9-6fdf-4dd5-98d0-e5e9269eb72f",
                    category: "Одежда",
                    subcategory: "Мужчинам",
                    characteristics: [
                        {
                            name: "Страна-изготовитель",
                            value: "Турция"
                        }
                    ],
                    variants: {
                        var1: {
                            name: "Цвет",
                            options: [
                                
                                    "Белый",
                                    "Черный"
                                
                            ]
                        },
                        var2: {
                            name: "Материал",
                            options: [
                                "" 
                            ]
                        }
                    },
                    combos: [
                        {
                            id: "a3335eec-08d0-45b1-b462-7344786d2f83",
                            name: "Футболка",
                            text: "Турецкая модная футболка",
                            old_price: "0.00",
                            price: "0.00",
                            stock: 0,
                            photos: []},
                            {
                                id: "a2335eec-08d0-45b1-b462-7344786d2f83",
                                opt1: "Черный",
                                name: "Худи",
                                text: "Турецкая модная худи",
                                old_price: "3000",
                                price: "2500",
                                stock: 4,
                                photos: [log,dostavka,log]}
                    ]
                    }]}
    }
    /*laodData = async () => {
        const response = await fetch("http://62.113.105.98:10001/api/v1/store/eac9c788-9599-4cc0-aba5-0b5508a04692/data/",{
            method: "GET",
            headers: {
                Authorization: 'BOTIQUE_2023_THE_BEST'
              }
        });
        const res = await response.json();
        console.log(res);
    }*/
    componentDidMount() {
        //this.laodData();
    }
    render() {//в каждый компонент мы можем передать дополнительнй класс для большей кастомизации
        //таким образом можно дообвлять цвет,рамки и так далее
        return (
            <div className="shop">
                <Vidjets data={this.store.banners}/>
                <LogoShop title={this.store["store_info"].name} text={this.store["store_info"].description} />
                <ItemList data={this.store.products}/>
            </div>     
        )
    }
}
export default Shop;