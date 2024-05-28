//IDŐK

const erkezes = document.getElementById("erkezes")
const tavozas = document.getElementById("tavozas")

//SZOBÁK

const egyagyas = document.getElementById("egyagy");
const ketagyas = document.getElementById("ketagy");
const ketagyegypot = document.getElementById("ketegypot");
const ketagyketpot = document.getElementById("ketketpot");

//VENDÉG SZÁM

const erkezokSzama = document.getElementById("fovalaszto").value;

//ELLATAS

const ellatasReg = document.getElementById("reggeli");
const ellatasFelP = document.getElementById("felpanz");
const ellatasTelj = document.getElementById("teljespanz");

//SZOLGALTATAS

const belteri = document.getElementById("belter");
const kulteri  = document.getElementById("kulter");
const szauna = document.getElementById("szauna");


function Koltsegszamitas(){
    Kiiras()
}

function Szobameghatarozas(){
    if(egyagyas.checked == true){
        return "Egyágyas - 9.000 Ft/éj";
    }
    else if(ketagyas.checked == true){
        return "Kétágyas - 15.000 Ft/éj";
    }
    else if(ketagyegypot.checked == true){
        return "Kétágyas 1 pótággyal - 18.000 Ft/éj";
    }
    else{
        return "Kétágyas 2 pótággyal - 21.000 Ft/éj";
    }
}

function Ellatasmeghatarozas(){
    if(ellatasReg.checked == true){
        return "Reggeli - 900 Ft/nap/fő";
    }
    else if(ellatasFelP.checked == true){
        return "Félpanzió - 2.900 Ft/nap/fő";
    }
    else{
        return "Teljes panzíó - 4.900 Ft/nap/fő";
    }
}

function Szolgaltatasmeghatarozas(){
    let belepo = "";

    if(belteri.checked == true){
        belepo += "Beltéri medencék, ";
    }
    if(kulteri.checked == true){
        belepo += "Kültéri medencék, ";
    }
    if(szauna.checked == true){
        belepo += "Szauna belépő, ";
    }
    if(belteri.checked && szauna.checked && kulteri.checked){
        belepo = "Teljes belépő"
    }
    return belepo

}

function Osszegmeghatarozas(){
    let datum = Math.abs(new Date(tavozas.value) - new Date(erkezes.value))
    let datumNap = Math.floor(datum / (1000*60*60*24))
    
    return ``

}

function Kiiras(){
    const szoba = Szobameghatarozas();
    const ellatas = Ellatasmeghatarozas();
    const igenyeltSzolg = Szolgaltatasmeghatarozas();
    const osszeg = Osszegmeghatarozas();
    alert(`Kedvves vendégünK!\n\nTájékoztatjuk a sikeres foglalásról.\n\nÉrkezés: ${erkezes.value}\nTávozás: ${tavozas.value}\nSzoba típusa: ${szoba}\nVendégek száma: ${erkezokSzama} fő\nEllátás: ${ellatas}\nIgényelt szolgáltatások: ${igenyeltSzolg}\nA teljes összeg: ${osszeg} Ft.\n\nKöszönjük megrendelését!`)
}

