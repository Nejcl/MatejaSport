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

  AnitaOpis:string = `Sem mama dvema že skoraj odraslima otrokoma. Zadnjih 10 let se intenzivno posvečam svoji največji strasti – športu. Udeležujem se izobraževanj in preberem vsako čtivo, ki mi pride pod roke. Pridobila sem si inštruktorske nazive v fitnesu in pilatesu. Zagovarjam zdrav življenski slog. Verjamem, da gibanje varuje in krepi človeško zdravje, tako telesno kot duševno, zato uživam v treniranju vadečih in sebe. Dan brez gibanja se mi zdi izgubljen. Pozimi si oprtam smuči na nahrbtnik in odkorakam na najbližji dvatisočak. Vedno iščem najbolj deviški pršič. Poleti pa uživam v plezanju, trekingu, teku, kolesarjenju,… Sem tudi strastna bralka knjig. V Mateja Športu vam bom z največjim veseljem in strastjo podajala svoje znanje..`;

  TinaOpis:string = `Sem velika ljubiteljica narave in aktivnega življenja, uživam v različnih športih, rada se izobražujem o zdravi prehrani ter biologiji človeka. Po izobrazbi sem biokemik, svoj doktorat sem pridobila z raziskavami na področju t.i. exercise biochemistry, kjer sem preučevala učinke redne vadbe na mehanizme v mišičnih celicah. Sem inštruktorica pilatesa, zadnja leta pa se precej posvečam tudi jogi. Že v najstniških letim sem pričela obiskovati skupinske vadbe in fitnes, zadnje leto pa začela tudi sama voditi vadbe, kar me veseli, prinaša nova znanja in izzive.`;
  SpelaOpis:string = `Sem trener aerobike. Pred leti sem veliko obiskovala fitnes in skupinske vadbe, ki so me kmalu popolnoma prevzele. Tako sem se odločila postati inštruktorica, saj neizmerno uživam ob zvokih dobre glasbe in delu z ljudmi. Trenutno vodim različne ure skupinskih vadb, na katerih skušam vse svoje znanje in energijo prenesti na vadeče. V času študija sem pridobila naziv trener aerobike, sem pa tudi učiteljica plavanja, nordijskega in alpskega smučanja. Redno se udeležujem različnih kongresov in izobraževanj s področja športa in zdravega načina življenja. Pridobila sem si tudi naziv Pilates MAT inštruktor. Gibanje je pomemben del mojega življenja, zato se trudim, da bi tudi vadeči vzljubili šport na prijeten in zdrav način. Rada poučujem tudi otroke, predvsem športno vadbo, smučanje in plavanje. Prosti čas pa najraje preživljam z družino nekje v naravi, kjer se napolnimo z novo energijo. `;
  AnaOpis:string = `Sem Ana, študentka 3. letnika dentale medicine. Večino časa, ki mi ostane poleg študija preživim zunaj, pozimi smučam in hodim po hribih poleti pa plezam, tečem in kolesarim. Šport me spremlja že vse življenje. Kot otrok sem začela s treningi plavanja, tam vztrajala 5 let in potem preizkusila še tenis, atletiko in odbojko, ki me je prepričala v resno treniranje. Tekmovalno sem se z njo ukvarjala 6 let, poleti pa sem se udeleževala tudi turnirjev na mivki. Po končanem treniranju sem pridobila C licenco za trenerja odbojke in 2 leti sodelovala z Odbojkarskim klubom Triglav Kranj. Odbojka me je povezala z Matejo in navdušila nad skupinskimi vadbami. Kasneje sem opravila 1. stopnjo tečaja za vaditelja rekreacije in s tem dobila še dodatno motivacijo, da ljubezen do športa prenesem na ljudi.`;
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

  JakaOpis:string = `S športom sem se srečal v 1. razredu OŠ, ko sem začel obiskovati ure karateja in nogometa. Povečini
  sem prosti čas preživljal športno, tudi za vikende, ko sem skupaj s starši zahajal v gorski svet. S tem se
  je v meni ustvarila doživljenjska ljubezen do narave, ki postaja še močnejša. Treniral sem še košarko
  in futsal.
  <br><br>
  Vse moje pretekle športne izkušnje so me pripeljale na fakulteto za šport, kjer sem dobil odgovor na
  vprašanje, zakaj tako uživam v športu, zame je šport osnovna potreba.
  <br><br>Športne službe, ki sem jih opravljal do sedaj:
  - Fitnes osebni trener<br>
  - vaditelj različnih vadb moči (pump, boot camp, funkcionalna vadba), pilatesa, nordijske hoje<br>
  - animator otroških rojstnodnevnih zabav<br>
  - maser<br>
  - refleksoterapevt za stopala<br><br>

  V Mateja Športu sem si želel delati zaradi energije in atmosfere, ki ju ustvarjajo vadeči in zaposleni.
  Moje poslanstvo je vadečim pomagati, da bi gibanje tudi za njih postalo osnovna potreba oziroma
  navada, in da bi v njem uživali.`;

  DasaOpis:string = `Sem 21 letna Tržičanka, študentka kineziologije na Fakulteti za šport. S športom se ukvarjam že od
  malih nog. Začela sem z rokometom, katerega sem trenirala 13 let. Po končani karieri pa se s športom
  ukvarjam predvsem rekreativno. Najraje zahajam v gore, kolesarim, tečem in hodim v fitnes. Ker je
  šport del mojega življenja, hkrati pa rada delam z ljudmi sem se odločila za študij na Fakulteti za
  šport, ki mi prinaša znanja in kompetence, ki jih lahko uporabljam v praksi. Delo v Mateja športu pa
  mi omogoča, da ljubezen do športa in svoje znanje delim z drugimi ljudmi.`;

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
    job:'Dipl. profesorica biologije in kemije, trener športne rekreacije in skupinske fitnes vadbe',
    description:'inštruktorica, receptorka',woman:true, show: false, opis:this.TjasaOpis},

    {src: '/assets/ins/anita.jpg',src2: '/assets/ins/anita.jpg', name:'Anita Derlink',
    job:'Ekonomski tehnik, inštruktorica fitnesa in pilatesa',
    description:'inštruktorica',woman:true, show: false, opis:this.AnitaOpis},

    {src: '/assets/ins/ziga.jpg', src2: '/assets/ins/ziga2.jpg', name:'Žiga Lipar',
    job:'Fizioterapevt, kineziolog',
    description:'inštruktor, maser',woman:false, show: false, opis:this.ZigaOpis},

    {src: '/assets/ins/ana.jpg',src2: '/assets/ins/ana.jpg', name:'Ana Žontar',
    job:'Študentka dentalne medicine, praktikantka',
    description:'inštruktorica, animatorka',woman:true, show: false, opis:this.AnaOpis},

    {src: '/assets/ins/jaka.jpg',src2: '/assets/ins/jaka.jpg', name:'Jaka Blatnik Hajdinjak',
    job:'diplomant kineziologije na Fakulteti za šport',
    description:'inštruktor',woman:false, show: false, opis:this.JakaOpis},

    {src: '/assets/ins/Meta.JPG',src2: '/assets/ins/Meta.JPG', name:'Meta Vidic',
    job:'Univerzitetna diplomirana ekonomistka, inštruktorica pilatesa (GZS)',
    description:'inštruktorica',woman:true, show: false, opis:this.MetaOpis},

    {src: '/assets/ins/dasa.jpg',src2: '/assets/ins/dasa.jpg', name:'Daša Žnidaršič',
    job:'',
    description:'animatorka',woman:true, show: false, opis:this.DasaOpis},

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
