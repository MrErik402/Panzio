//IDŐK

const erkezes = document.getElementById("erkezes")
const tavozas = document.getElementById("tavozas")

//SZOBÁK

const egyagyas = document.getElementById("egyagy");
const ketagyas = document.getElementById("ketagy");
const ketagyegypot = document.getElementById("ketegypot");
const ketagyketpot = document.getElementById("ketketpot");

//VENDÉG SZÁM

const erkezokSzama = document.getElementById("fovalaszto");

//KOROK

const fo1 = document.getElementById("fo1");
const fo2 = document.getElementById("fo2");
const fo3 = document.getElementById("fo3");
const fo4 = document.getElementById("fo4");

//ELLATAS

const ellatasReg = document.getElementById("reggeli");
const ellatasFelP = document.getElementById("felpanz");
const ellatasTelj = document.getElementById("teljespanz");

//SZOLGALTATAS

const belteri = document.getElementById("belter");
const kulteri  = document.getElementById("kulter");
const szauna = document.getElementById("szauna");
const teljes = document.getElementById("teljes");

//EGYÉB VÁLTOZÓK - TÖMBÖK

let mennyiseg = [];
let szobaTulajdonsagok = [];

//Kódban használt függvények

function Szobameghatarozas(){
    if(egyagyas.checked == true){
        szobaTulajdonsagok.push(egyagyas);
        return "Egyágyas - 9.000 Ft/éj";
       
    }
    else if(ketagyas.checked == true){
        szobaTulajdonsagok.push(ketagyas);
        return "Kétágyas - 15.000 Ft/éj";
        
    }
    else if(ketagyegypot.checked == true){
        szobaTulajdonsagok.push(ketagyegypot);
        return "Kétágyas 1 pótággyal - 18.000 Ft/éj";
        
    }
    else{
        szobaTulajdonsagok.push(ketagyketpot);
        return "Kétágyas 2 pótággyal - 21.000 Ft/éj";
       
    }
}

function Ellatasmeghatarozas(){
    if(ellatasReg.checked == true){
        szobaTulajdonsagok.push(ellatasReg);
        return "Reggeli - 900 Ft/nap/fő";
        
    }
    else if(ellatasFelP.checked == true){
        szobaTulajdonsagok.push(ellatasFelP);
        return "Félpanzió - 2.900 Ft/nap/fő";
        
    }
    else{
        szobaTulajdonsagok.push(ellatasTelj);
        return "Teljes panzíó - 4.900 Ft/nap/fő";
        
    }
}

function Szolgaltatasmeghatarozas(){
    let belepo = "";
    
    if(belteri.checked == true){
        belepo += "Beltéri medencék, ";
        mennyiseg.push(800);
    }
    if(kulteri.checked == true){
        belepo += "Kültéri medencék, ";
        mennyiseg.push(800);
    }
    if(szauna.checked == true){
        belepo += "Szauna belépő, ";
        mennyiseg.push(800);
    }
    if((belteri.checked && szauna.checked && kulteri.checked) || teljes.checked ){
        belepo = "Teljes belépő";
    }
    return belepo

}

function OsszegSzamitas(napokSzama){

    if(mennyiseg.length == 3){
        return `${Number((napokSzama*szobaTulajdonsagok[0].value)+(napokSzama*erkezokSzama.value*szobaTulajdonsagok[1].value)+(napokSzama*erkezokSzama.value*2000))}`;
    }
    else if(mennyiseg.length == 2){
        return `${Number((napokSzama*szobaTulajdonsagok[0].value)+(napokSzama*erkezokSzama.value*szobaTulajdonsagok[1].value)+(napokSzama*erkezokSzama.value*1600))}`;
    }
    else if(mennyiseg.length == 1){
        return `${Number((napokSzama*szobaTulajdonsagok[0].value)+(napokSzama*erkezokSzama.value*szobaTulajdonsagok[1].value)+(napokSzama*erkezokSzama.value*800))}`;
    }
    else{
        return `${Number((napokSzama*szobaTulajdonsagok[0].value)+(napokSzama*erkezokSzama.value*szobaTulajdonsagok[1].value))}`;
    }
    
}

function Osszegmeghatarozas(){
    let datum = Math.abs(new Date(tavozas.value) - new Date(erkezes.value));
    let datumNap = Math.floor(datum / (1000*60*60*24)); //Nap meghatározása
    let osszeg = OsszegSzamitas(datumNap);
    return `${osszeg}`;

}

// Weboldalon meghívott függvények

function Lezaras(){

    fo4.disabled = false;
    fo3.disabled = false;
    fo2.disabled = false;
    fo1.disabled = false;

    const erkezokSzam = erkezokSzama.value;
    if(erkezokSzam == 3)
    {
        fo4.disabled = true;
    }
    else if(erkezokSzam == 2){
        fo4.disabled = true;
        fo3.disabled = true;
    }
    else if(erkezokSzam == 1){
        fo4.disabled = true;
        fo3.disabled = true;
        fo2.disabled = true;
    }
}


function Koltsegszamitas(){

    mennyiseg = [];
    szobaTulajdonsagok = [];
    const szoba = Szobameghatarozas();
    const ellatas = Ellatasmeghatarozas();
    const igenyeltSzolg = Szolgaltatasmeghatarozas();
    const osszeg = Osszegmeghatarozas();
    
    if(Ellenorzes(szobaTulajdonsagok)){
        alert(`Kedves vendégünk!\n\nTájékoztatjuk a sikeres foglalásról.\n\nÉrkezés: ${erkezes.value}\nTávozás: ${tavozas.value}\nSzoba típusa: ${szoba}\nVendégek száma: ${erkezokSzama.value} fő\nEllátás: ${ellatas}\nIgényelt szolgáltatások: ${igenyeltSzolg}\nA teljes összeg: ${Number(osszeg)} Ft.\n\nKöszönjük megrendelését!`)
    }
    else{
        alert("Hiba történt az adatbevitelben!")
    }
    
}

// Ellenőrzés

function Ellenorzes(szoba){
    const korok = KorEllenorzes(); //Ha ez listaa
    const potAgyak = PotagyEllenorzes(korok); //Ha ez "true"
    if(potAgyak){
        const potAgyKivalasztva = PotagyValasztasEllenorzes(potAgyak, szobaTulajdonsagok); //Igaz esetén helyesen van pótágy választva, hamis esetén helytelenül van pótágy választva! 
        return false;
    }
    return true;
    
}

function KorEllenorzes(){ //MÜKSZIK
    let korLista = [];
    let szuksegesKorokSzama = erkezokSzama.value;
    if(szuksegesKorokSzama == 4){
        korLista.push(fo1.value);
        korLista.push(fo2.value);
        korLista.push(fo3.value);
        korLista.push(fo4.value);
    }
    else if(szuksegesKorokSzama == 3){
        korLista.push(fo1.value);
        korLista.push(fo2.value);
        korLista.push(fo3.value);
    }
    else if(szuksegesKorokSzama == 2){
        korLista.push(fo1.value);
        korLista.push(fo2.value);
    }
    else{
        korLista.push(fo1.value);
    }
    return korLista;
}

function PotagyEllenorzes(korok){
    for(let i = 0; i<korok.length; i++){
        if(korok[i] <= 16){
            return true;
        }
    }
    return false;
}

function PotagyValasztasEllenorzes(potAgyak, szobaTulajdonsagok){
    if(potAgyak && (szobaTulajdonsagok[0] == "ketagyegypot" || szobaTulajdonsagok[0] == "ketagyketpot")){
        return true;
    }
}