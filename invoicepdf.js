$invoicetopdf = $("[name=invoice-to-pdf]");
$invoicetopdf.on("click", function () {
    var dg = ['нуль', 'одна', 'дві', 'три', 'чотири', 'п`ять', 'шість', 'сім', 'вісім', 'дев`ять'];
    var tn = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п`ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев`ятнадцять'];
    var tw = ['', 'двадцять', 'тридцять', 'сорок', 'п`ятдеят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев`яносто'];
    var ts = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п`ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев`ятсот'];

function toWords(num) {
    num = num.toString();
    num = num.replace(/[\, ]/g, '');
    if (num != parseFloat(num)) return 'not a number';
    var x = num.length;
    var n = num.split('');
    var result = '';
    var sk = 0;

    for (var i = 0; i < x; i++) {
    if (sk == 1) {
        result += tn[n[i]] + ' ';
        if ((x-i)==4) {
            result += 'тисяч ';
        }
        sk = 0;
        i++;
    }
    if (sk == 0) {
        if (n[i] == 0) {
            if ((x-i)==4) {
                result += 'тисяч ';
            }
            if ((x-i)==1) {
                result += ' гривень 00 копійок';
            }
        } else if ((x-i)==1) {
            result += dg[n[i]];
            if (n[i] == 1) {
                result += ' гривня 00 копійок';
            } else if (n[i] < 5) {
                result += ' гривні 00 копійок';
            } else {
                result += ' гривень 00 копійок';
            }
        } else if ((x-i)==2) {
            if (n[i] == 1) {
                sk = 1;
            } else {
                result += tw[n[i]-1] + ' ';
            }
        } else if ((x-i)==3) {
            if (result != '') {
                result += ts[n[i]] + ' ';
            } else {
                result += ts[n[i]] + ' ';
            }
        } else if ((x-i)==4) {
            result += dg[n[i]];
            if (n[i] == 1) {
                result += ' тисяча ';
            } else if (n[i] < 5) {
                result += ' тисячі '
            } else {
                result += ' тисяч '
            }
        } else if ((x-i)==5) {
            if (n[i] == 1) {
                sk = 1;
            } else {
                result += tw[n[i]-1] + ' ';
            }
        }
    }
}
    return result;
};
var num = rcost;
var empnum = document.getElementsByName('slider')[0].value;
var words = toWords(num);
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy;
var invoicenum = Math.floor(Date.now() / 1000);
invoicenum = invoicenum.toString();
num = num.toString()+'.00';
empnum = empnum.toString();
window.jsPDF = window.jspdf.jsPDF;
var doc = new jsPDF();
doc.addFont("/wp-content/uploads/script/jsPDF/test/reference/PTSans.ttf", "PTSans", "normal");
doc.setFont("PTSans");
doc.setFontSize(14);
doc.text("Виконавець:", 10, 10);
doc.text("ФІЗИЧНА ОСОБА-ПІДПРИЄМЕЦЬ МЕЛЬНИЧУК МАКСИМ СЕРГІЙОВИЧ", 40, 10);
doc.text("ІПН 3254906717", 40, 15);
doc.text("69035, місто Запоріжжя,  вулиця 40 років Радянської України, будинок 59,", 40, 20);
doc.text("квартира 13", 40, 25);
doc.text("UA243133990000026007055704443", 40, 30);
doc.text('ЗАПОРІЗЬКЕ РУ АТ КБ "ПРИВАТБАНК"', 40, 35);
doc.text('МФО 313399', 40, 40);
doc.text('Замовник', 10, 50);
doc.text("Рахунок-фактура № ", 75, 60);
doc.text(invoicenum+' від '+today, 119, 60);
doc.text("№", 10, 70);
doc.text("Назва", 50, 70);
doc.text("Од.виміру", 105, 70);
doc.text("Ціна без", 132, 70);
doc.text("Кількість", 155, 70);
doc.text("Сума без", 180, 70);
doc.text('ПДВ', 137, 75);
doc.text('ПДВ', 187, 75);
doc.text('1', 10, 82);
doc.text('Технічна підтримка программи KPI', 18, 82);
doc.text('шт.', 115, 82);
doc.text(num, 133, 82);
doc.text('1', 165, 82);
doc.text(num, 182, 82);
doc.text(empnum+" працівників строком на 1 місяць", 18, 87);
doc.text('Всього без ПДВ:', 145, 95);
doc.text(num, 182, 95);
doc.text("Всього на суму: ", 10, 105);
doc.text(words, 45, 105);
doc.text("В т.ч. ПДВ :  Без ПДВ", 10, 110);
doc.text("Виписав: Мельничук М.С.", 95, 140);
doc.text("Б.П.", 170, 145);
doc.setTextColor("red");
doc.text("Важливо!", 10, 175);
doc.setTextColor("black");
doc.text("Після оплати надішліть на support@kpi-check.online дані куди вислати доступи.", 10, 180);
doc.text("У призначенні платежу вкажіть № рахунку та кількість співробітників.", 10, 185);
doc.addImage("/wp-content/uploads/2022/04/sign2.png", "PNG", 155, 125, 30, 30);
doc.save('invoice.pdf');
});
