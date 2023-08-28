import React from "react";
import Vidjets from "./Vidjets";
import ItemList from "./ItemList";
import LogoShop from "./LogoShop";
import dostavka from "../dostavka.svg";
import animate from "../animation.png";
import { v4 as uuid} from 'uuid';
import log from "../Flower.svg";
class Shop extends React.Component {
    constructor(props) {
        super(props);
        localStorage.clear();
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
                            name: "Попа",
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
                    combos: [//миниум должно быть живых две комбинации это важно !!!
                        {
                            id: "a3335eec-08d0-45b1-b462-7344786d2f83",
                            name: "Футболка",
                            text: "Турецкая модная футболка",
                            old_price: "0.00",
                            price: "0.00",
                            stock: 0,
                            photos: []},
                            {
                                id: "a2315eec-08d0-45b1-b462-7344786d2f83",
                                opt1: "Черный",
                                name: "Худи",
                                text: "Турецкая модная худи",
                                old_price: "3000",
                                price: "2500",
                                stock: 4,
                                photos: [log,dostavka,log]},
                                {
                                    id: "a2325eec-08d0-46b1-b462-7344786d2f83",
                                    opt1: "Белый",
                                    name: "Боб",
                                    text: "Турецкая модная хуцотасцусу",
                                    old_price: "3000",
                                    price: "1500",
                                    stock: 5,
                                    photos: [log,dostavka,log]}
                    ]
                    }]};
        this.state = {data: null};
    }
    /*laodData = async () => {
        const response = await fetch("http://62.113.105.98:10001/api/v1/store/eac9c788-9599-4cc0-aba5-0b5508a04692/data/",{
            method: "GET",
            headers: {
                Authorization: 'BOTIQUE_2023_THE_BEST'
              }
        });
        const res = await response.json();
        this.setState({data: res});
    }*/
    justForAnimation = () => {
        setTimeout(() => {
            this.setState({data: this.store})
        },3 * 1000)
    }
    componentDidMount() {
        //this.laodData();
        this.justForAnimation();
    }
    render() {
        if (this.state.data === null) {
            return <div className="animation-container">
                    <img src={animate} className="animation-loading" alt="логотип"></img>
                </div>
        }
        return (
            <div className="shop">
                <Vidjets data={this.state.data.banners}/>
                <LogoShop title={this.state.data["store_info"].name} text={this.state.data["store_info"].description} />
                <ItemList data={this.state.data.products}/>
            </div>     
        )
    }
}
export default Shop;