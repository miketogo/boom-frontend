import { spacer } from "../../components/BuyNumberModal";
// import logo2 from '../../assets/images/logo2.svg'

const colParser = (detail) => {
    let result = [
        `${detail["Дата звонка"]}  /  ${detail["Время звонка"]}`,
    ]
    if(detail["Тип звонка"] === "GPRS"){
        result = [...result,  `Интернет (${detail["Интернет МБ"]} мб.)`, "Beeline", {text: "--", alignment: "center"}]
    } 
    else if(detail["Тип звонка"] === "SMS / MMS") {
        let operator = detail["Описание звонка"].split(" ");
        operator = operator[operator.length - 1].toLowerCase();
        result = [...result,  `SMS / MMS (${spacer(detail["Входящий номер"])})`, operator, {text: "--", alignment: "center"}]
    } 
    else if(detail["Тип звонка"] === "Местные звонки") {
        let operator = detail["Описание звонка"].split("\"");
        operator = operator[operator.length - 1] ? operator[operator.length - 1].toLowerCase() : operator[operator.length - 2].toLowerCase();
        result = [...result,  `Звонок (${"+7 " + spacer(detail["Входящий номер"])})`, operator, 
        {text: `${detail["Продолжительность звонка"]}`, alignment: "center"}]
    }
    return result
}

// const reader = new FileReader();

const docDefinition = (details) => ({
    pageMargins: [ 40, 30 ],
    // header: {
    //     image: reader.readAsDataURL(logo2),
    //     width: 30,
    // },
    content: [
        {text: "Ваша детализация\n\n", style: "header", alignment: "center"},
        {
            table: {
                headerRows: 1,
                body: [
                    [ {text: 'Дата', style: "tableHeader"}, {text: 'Действие', style: "tableHeader"}, {text: 'Оператор', style: "tableHeader"}, {text: 'Длительность', style: "tableHeader"} ],
                    ...details.slice(0, 2000).filter(detail => detail["Продолжительность звонка"]).map(detail => colParser(detail))
                ]
            }
        }
    ],
    defaultStyle: {
        fontSize: 16,
    },
    styles: {
        header: {
            fontSize: 25,
            bold: true
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
        },
    },
    footer: (currentPage) =>  ({ text: currentPage.toString(), alignment: 'left', fontSize: 11, margin: [40, 0] }),
    info: {
        title: 'Детализация | Boom Telecom',
    },
})

export default docDefinition;