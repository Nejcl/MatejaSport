import { Component, OnInit, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { InstruktorBoxComponent } from '../instruktor-box/instruktor-box.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],

})
export class ProfileCardComponent implements OnInit, AfterViewInit {

  MatejaOpis:string = `Sem inštruktorica aerobike (FŠ, GZS) in pilatesa (FZS), kondicijska trenerka in maserka. Redno se udeležujem izobraževanj in seminarjev na temo skupinskih vadb, fitnesa, kondicijske priprave, funkcionalne vadbe, rehabilitacije ter masaž pri nas in v tujini.
  <br><br>
  Z vodenjem vadb se ukvarjam že od srednješolskih let, ko sem nabirala izkušnje po številnih drugih centrih. Sedaj pa se mi je izpolnila moja velika želja saj to izvajam v svojem centru, v sodelovanju s super ekipo.
  <br><br>
  V preteklosti sem delala tudi kot kondicijska trenerka po športnih klubih, ter ogromno ur preživela z našimi najmlajšimi na tečajih plavanja, smučanja, rolanja ter najrazličnejših taborih. Sčasoma sem ugotovila, da je moj največji užitek delo s skupinami odraslih, kjer poskušam vadečim izpolniti njihove cilje in sanje z zmanjšanjem telesne teže, oblikovanjem postave, izboljšanjem njihovih motoričnih sposobnosti ter jim pomagati na  poti do sreče in zadovoljstva.
  <br><br>
  Tudi sicer je moj prosti čas prepleten s športom, saj ga najraje preživim v naravi, na kolesu, v gorah, v teku … Imam srečo, da je moj hobi moj poklic.`;

  TjasaOpis:string = `Moje zanimanje za šport in aktivno preživljanje prostega časa, se je pričelo v osnovni šoli. Takrat sem pričela trenirati ritmično gimnastiko, za popestritev pa sem se vključila še v šolsko odbojkarsko ekipo in plesala hip hop. Kasneje sem gimnastiko zamenjala za dvoransko odbojko. V poletnem času se poleg teka in rolanja rada posvetim odbojki na mivki, ki je še vedno moje najljubše preživljanje prostega časa.
  <br><br>
  Ko sem prenehala trenirati odbojko sem iskala druge načine ohranjanja kondicije. Tako me je pot zanesla v Mateja šport, kjer sem pričela obiskovati  skupinske vadbe, ki so me povsem navdušile. Pojavila se je želja, ki se je z malo spodbude tudi uresničila in postala sem vaditeljica skupinskih vadb. Trenutno vodim IFT, Body shape in TNZ. V vodenju naravnost uživam in močno stremim k temu, da svoje znanje na tem področju čimbolj izpopolnim, saj vadečim želim zagotoviti kakovostno, dinamično in predvsem učinkovito vadbo, v kateri bodo uživali in se radi vračali na moje ure. Sčasoma sem ugotovila, da si tega ne želim početi le začasno in tako je užitek v vodenju prerasel v moj poklic, ki ga spremljata predvsem skrb in odgovornost za vadeče. Ti so tudi moja največja motivacija, da se na ure odpravljam z veseljem in nasmehom na obrazu.`;

  EvaOpis:string = `Šport me spremlja že od malih nog in predstavlja moj vir zadovoljstva, miru, sreče, energije, hkrati pa povezuje s podobnimi ljudmi in mi pomaga, če glava ni na pravem mestu. Začelo se je z atletiko v mladosti, nadaljevalo pa s tekmovalnimi plesi in tekom. Skupinske vadbe odlično združujejo segmente atletskih elementov in plesa, kar me navdušuje, zato sem se na tem področju hitro udomačila. Rada imam visoko intenzivne vadbe, kjer preizkušamo svoje meje in zmogljivost, aerobika in ples pa me vračata v stara plesna leta. Odkar sem mama dvema (sedaj) malčkoma, se rada posvečam tudi bolj umirjenim dejavnostim kot sta pilates in meditacija. Poleg športa pa se ukvarjam tudi s kozami ter mlečno predelavo.`;

  TinaOpis:string = `Sem velika ljubiteljica narave in aktivnega življenja, uživam v različnih športih, rada se izobražujem o zdravi prehrani ter biologiji človeka. Po izobrazbi sem biokemik, svoj doktorat sem pridobila z raziskavami na področju t.i. exercise biochemistry, kjer sem preučevala učinke redne vadbe na mehanizme v mišičnih celicah. Sem inštruktorica pilatesa, zadnja leta pa se precej posvečam tudi jogi. Že v najstniških letim sem pričela obiskovati skupinske vadbe in fitnes, zadnje leto pa začela tudi sama voditi vadbe, kar me veseli, prinaša nova znanja in izzive.`;
  SpelaOpis:string = `Sem trener aerobike. Pred leti sem veliko obiskovala fitnes in skupinske vadbe, ki so me kmalu popolnoma prevzele. Tako sem se odločila postati inštruktorica, saj neizmerno uživam ob zvokih dobre glasbe in delu z ljudmi. Trenutno vodim različne ure skupinskih vadb, na katerih skušam vse svoje znanje in energijo prenesti na vadeče. V času študija sem pridobila naziv trener aerobike, sem pa tudi učiteljica plavanja, nordijskega in alpskega smučanja. Redno se udeležujem različnih kongresov in izobraževanj s področja športa in zdravega načina življenja. Pridobila sem si tudi naziv Pilates MAT inštruktor. Gibanje je pomemben del mojega življenja, zato se trudim, da bi tudi vadeči vzljubili šport na prijeten in zdrav način. Rada poučujem tudi otroke, predvsem športno vadbo, smučanje in plavanje. Prosti čas pa najraje preživljam z družino nekje v naravi, kjer se napolnimo z novo energijo. `;
  AnaOpis:string = `Sem Ana, študentka 6. letnika dentale medicine. Večino časa, ki mi ostane poleg študija preživim zunaj, pozimi smučam in hodim po hribih poleti pa plezam, tečem in kolesarim. Šport me spremlja že vse življenje. Kot otrok sem začela s treningi plavanja, tam vztrajala 5 let in potem preizkusila še tenis, atletiko in odbojko, ki me je prepričala v resno treniranje. Tekmovalno sem se z njo ukvarjala 6 let, poleti pa sem se udeleževala tudi turnirjev na mivki. Po končanem treniranju sem pridobila C licenco za trenerja odbojke in 2 leti sodelovala z Odbojkarskim klubom Triglav Kranj. Odbojka me je povezala z Matejo in navdušila nad skupinskimi vadbami. Kasneje sem opravila 1. stopnjo tečaja za vaditelja rekreacije in s tem dobila še dodatno motivacijo, da ljubezen do športa prenesem na ljudi.`;
  MetaOpis:string = `Že od majhnih nog se aktivno ukvarjam s športom. V mladosti sem 7 let trenirala namizni tenis ter 5 let atletiko. V namiznem tenisu sem se preizkusila še med študijem, ko smo z ekipo igrale v prvi slovenski ligi. Ob koncu srednje šole sem začela obiskovati skupinske vadbe, v zadnjih nekaj letih pa mi je pilates prirasel k srcu, zato sem se odločila, da opravim tečaj in postanem inštruktorica pilatesa. Vodenje in poučevanje me zelo veseli in mi predstavlja nove izzive. Poleg pilatesa in drugih skupinskih vadb rada hodim v hribe, tečem, igram tenis in kolesarim.`;

  ZigaOpis:string = `Šport je bil od nekdaj prisoten v mojem življenju. Pred začetkom šole sem se  začel ukvarjati s smučanjem, s katerim sem se tekmovalno ukvarjal do 12 leta, ko sem  bele strmine zamenjal za nogometna igrišča. S študijem na Fakulteti šport sem z aktivnim igranjem nogometa prenehal.
  <br><br>
  Na Fakulteti za šport sem zaključil študij Kineziologije in pridobil poglobljeno znanje o gibanju človeškega telesa. Sledil je študij fizioterapije, kjer sem svoje znanje dodatno razširil tudi v smeri rehabilitacije. Na Fakulteti za šport sem pridobil nazive: vaditelj plavanja, vaditelj športne rekreacije 2, učitelj smučanja 1, vaditelj Zdrave vadbe ABC. Ob študiju sem opravil še tečaje Kinesiotapinga in tapinga z bandažnimi trakovi. Po študiju fizioterapije sem opravil tečaj FASCIQ® – celosten koncept zdravljenja fascij (FTC), IASTM – Cupping – Flossing – Masažni pripomočki.
  <br><br>
  V svojem prostem času največ časa namenjam cestnemu kolesarstvu in funkcionalni vadbi. Moj cilj je združiti znanja Fizioterapije in Kineziologije in omogočiti posamezniku zdravo in varno vadbo brez bolečin. Osebni cilj: vsako leto poskusi nov šport!
  <br><br>
  <b>Reference</b><br>
  - HDD Olimpija, hokej, 2012-2013 – masaža<br>
  - Ljubljana Beach Volley Challenge, odbojka, 2013,2014 – masaža<br>
  - AK Rožle Prezelj, atletika, 2015-2017 – vadba<br>
  - Studio Fascia, fizioterapija, 2017-2019 – funkcionalna vadba, vadba po poškodbah<br>
  - Splošna bolnišnica Jesenice, 2018 – 2019 –fizioterapevtska ambulanta in bolnišnični oddelki<br>
  - ZD Kranj, 2019 –  , – fizioterapevt<br>
  - Mateja šport, 2014 – , kineziološka obravnava, individualni trening, funkcionalna vadba, masaža, kinesiotaping<br>
  `;

  KatjaOpis:string = `Po izobrazbi pravnica, velika ljubiteljica športa in aktivnega načina življenja, ki je tekom študentskih let in prve zaposlitve, stopila na pot uresničitve svojega poslanstva v delu osebnega trenerja in vaditelja skupinskih vadb.<br>
  S športom se ukvarjam že od malih nog. Trenirala sem atletiko, ples, jahanje, rokomet. V obdobju študentskih let sem redno začela obiskovati različne skupinske vadbe, ki so mi ob študiju omogočile gibanje in sprostitev. Tako se je počasi začela razvijati ideja in želja, da bi se tudi sama preizkusila v vlogi trenerja.  Občasne športne aktivnosti so kmalu prerasle v sam način življenja. Vse skupaj je rezultiralo v sprejemu odločitve za pridobitev licence za trenerja funkcionalne vadbe pri Fitnes zvezi Slovenije. Delam kot osebna trenerka in vaditeljica skupinskih vadb. Redno spremljam stroko, se izobražujem in nadgrajujem svoje znanje na različnih tečajih in seminarjih. Vodim funkcionalni/funkcionalno-intervalni trening, pilates, vadbo zdrave hrbtenice in PUMP. Pri sami sestavi treningov in vodenju skrbim, da so treningi vedno varni, raznoliki ter vključujejo različne gibalne vzorce za razvoj različnih gibalnih sposobnostih. Šport je področje na katerem želim delovati, se razvijati in se preko osebnega trenerstva in vodenja skupinskih vadb dotakniti ljudi ter jim pomagati, saj gre za področje dela v katerega sama verjamem in ga tudi živim.`;

  MajaOpis:string = `Od malih nog sem rada v gibanju. Otroštvo in najstništvo sem preplesala, kasneje pa sem začela obiskovati skupinske vadbe in prav v Mateja športu sem začela obiskovati ure pilatesa, ki so me navdušile. Matejina vzpodbuda mi je dala zagon, da sem znanje poglobila in nadgradila na inštruktorskem tečaju Fitnes zveze Slovenije in v vodenju vadb našla nov izziv in veselje.

  Poučevanje me veseli. V prostem času se ukvarjam tudi z inštrukcijami matematike. Kot protiutež sedečemu načinu življenja in času preživetim za ekrani, za sprostitev in užitek obiščem kakšen hrib, obujem rolerje ali plesne čevlje, sedem na kolo ali zapnem vezi na boardu. Žogo pa poprimem le na urah pilatesa. Gibanje je privilegij, izkoristi ga.`;

  KajaOpis:string = `Diplomirana kineziologinja in študentka magistrskega programa Kinezioterapije na Fakulteti za šport, maserka
  Odkar pomnim se rada gibljem in ukvarjam s športom. V otroštvu sem preizkusila precej športov,
   vendar pa me je najbolj navdušilo deskanje na snegu – prosti slog,
    s katerim sem se nekaj let tudi tekmovalno ukvarjala. Po koncu gimnazije sem se vpisala na Fakulteto za šport – smer Kineziologija,
     kjer sem pridobila kar nekaj nazivov, med njimi: vaditelj plavanja, učitelj deskanja na snegu 2, vaditelj športne rekreacije in NPK-maser.
 Že zelo kmalu mi je bilo jasno, da bo moje delo povezano z ljudmi. Trenutno so to predvsem otroci, saj se poleg študija
  ukvarjam s poučevanjem plavanja pri PK Triglav Kranj in z otroškimi vadbami. V zimskem času pa otroke učim deskanja na snegu.
   Otroke imam zelo rada, predvsem zaradi njihove pozitivne energije in iskrenosti. Zdi se mi zelo pomembno, da je njihov razvoj pravilno usmerjen.
    Zato se na vadbi potrudim, da se preko igre naučijo pravilnega gibanja in se ob tem tudi zabavajo`;

  iPeople: Array<{src:string, src2:string, name:string, job:string, description:string, woman:boolean, show:boolean, opis: string}> = [
    {src: '/assets/ins/mateja.jpg', src2:'/assets/ins/mateja.jpg', name:'Mateja Habjanič',
    job:'Profesorica športne vzgoje, diplomirana kondicijska trenerka (FŠ), trenerka aerobike, pilatesa in fitnesa 3. stopnje (FZS)',
    description:'inštruktorica, maserka, osebna in kondicijska trenerka',woman: true, show: false, opis:this.MatejaOpis},

    {src: '/assets/ins/tjasa.jpg', src2: '/assets/ins/tjasa2.jpg',name:'Tjaša Bergant',
    job:'Mag. profesorica biologije in kemije, trenerka športne rekreacije in skupinske fitnes vadbe',
    description:'inštruktorica, receptorka',woman:true, show: false, opis:this.TjasaOpis},

    {src: '/assets/ins/eva.jpg',src2: '/assets/ins/eva.jpg', name:'Eva Tomazin',
    job:'Dipl. zootehnik in pedagog',
    description:'inštruktorica',woman:true, show: false, opis:this.EvaOpis},

    {src: '/assets/ins/ziga.jpg', src2: '/assets/ins/ziga2.jpg', name:'Žiga Lipar',
    job:'Fizioterapevt, kineziolog',
    description:'inštruktor, maser',woman:false, show: false, opis:this.ZigaOpis},

    {src: '/assets/ins/ana.jpg',src2: '/assets/ins/ana.jpg', name:'Ana Žontar',
    job:'Študentka dentalne medicine, praktikantka',
    description:'inštruktorica, animatorka',woman:true, show: false, opis:this.AnaOpis},

    {src: '/assets/ins/katja.jpg',src2: '/assets/ins/katja.jpg', name:'Katja Žaler',
    job:'Magistrica prava, trenerka fitnes funkcionalne vadbe (FZS)',
    description:'inštruktorica',woman:true, show: false, opis:this.KatjaOpis},

    {src: '/assets/ins/Meta.jpg',src2: '/assets/ins/Meta.jpg', name:'Meta Vidic',
    job:'Univerzitetna diplomirana ekonomistka, inštruktorica pilatesa (GZS)',
    description:'inštruktorica',woman:true, show: false, opis:this.MetaOpis},

    {src: '/assets/ins/Maja.jpg',src2: '/assets/ins/Maja.jpg', name:'Maja Jurančič',
    job:'',
    description:'animatorka',woman:true, show: false, opis:this.MajaOpis},

    {src: '/assets/ins/tina.jpg',src2: '/assets/ins/tina.jpg', name:'Tina Peternelj',
    job:'Doktorica biokemije, inštruktorica pilatesa',
    description:'inštruktorica',woman:true, show: false, opis:this.TinaOpis},

    {src: '/assets/ins/kaja.jpg',src2: '/assets/ins/kaja.jpg', name:'Kaja Perne',
    job:'Diplomirana kineziologinja in študentka magistrskega programa Kinezioterapije na Fakulteti za šport, maserka',
    description:'inštruktorica, maserka',woman:true, show: false, opis:this.KajaOpis},

  ];

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(index: number)
  {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(InstruktorBoxComponent, {
      position: {'top': '100px'},
      autoFocus: false,
      width: '80%',
      panelClass: 'myDialog',
      data: this.iPeople[index],

    });
  }


  ngAfterViewInit()
  {
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
  }


}
