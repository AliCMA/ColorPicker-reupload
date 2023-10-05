
/* Hier defineer ik de de 4 eigenschappen */
class ColorCard {
    /* De id voor unieke id*/
    id;

    /* De kleur */
    color;

    /*Bepaalde dingen toe te voegen aan me lijst van de kleuren*/
    addToList;

    /* De html element*/
    htmlElement;

    /* Voor de tekst*/
    text;

    constructor(newId, newColor, addToList) {
        /* Dit zijn de setting properties*/
        this.id = newId;
        this.color = newColor;
        this.addToList = addToList;
     

        /* Hier maken we HTML elementen om te renderen*/

        /* Dus i.p.v in ons .html te bewerken, maken we ze hier aan doormiddel van this.(warvoor element).(style of class naam)*/
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList = "colors__color";

        this.circle = document.createElement("figure");
        this.circle.classList = "colors__circle";
        this.circle.style.background = this.color;
        
        this.text = document.createElement("p");
        this.text.innerText = "Copied";
        this.text.classList = "colors__text";
        
        this.htmlElement.onclick = this.onHTMLElementClicked;
        /* En dit is de uiteindelijke render, dit zorgt ervoor dat het te voorschijn komt in ons dashboard met de kleuren */
        this.render(); 

    }


    /* Dit is een arrow functie voor bij het klikken op een kleur die je wilt */
    onHTMLElementClicked = () =>{

        /* Hier wordt de cirkel veranderdt */
        this.circle.classList.add("colors__circle--selected");

        /* Hier wordt de sitenaam veranderd naar de gekieste hsl code door jouw */
        document.title = this.color;

        /* Hierwordt naar ons copy paste klembord gekopieerd de kleur die je hebt gekozen */
        window.navigator.clipboard.writeText(this.color);
    }

    /* Hier komt ons colorcard object op ons scherm als we de live server starten */
    /* En de onderste this. elementen voegen hun eigen functie toe aan de html element die we hebben opgeslagen */
    render() {
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
        this.addToList.appendChild(this.htmlElement);
    }
}


/* Hier defineren we de class colorlist */
class ColorList {
    id;
    htmlElement;

    /* De constructor methode neemt een newId en wordt uitgevoerd wanneer een nieuw object van de ColorList klasse wordt gemaakt. */
    constructor(newId){
        

        /* De new id wordt doorgegeven aan ons constructor */
        this.id = newId;

        /* Hier maken we een nieuwe ul*/
        this.htmlElement = document.createElement("ul");

        /* Hier krijgt de element een nieuw ID */
        this.htmlElement.id = this.id;
        /* Hier wordt de css klasse "colors" toegevoegd aan het ul */
        this.htmlElement.classList.add("colors");
        /* En hier render ik het zodat alles te voorschijn komt en werkt */
        this.render();
       
    }

    render(){
        document.querySelector("body").appendChild(this.htmlElement);
    }

}

/*  randomHue; randomSaturation; randomLightness; slaan de waardes op bij genereren van ons hsl kleuren */
class HSLGenerator{
    randomHue;
    randomSaturation;
    randomLightness;
    hsl;

    /* Wanneer een nieuw object  wordt gemaakt bij deze class  wordt deze constructor ALTIJD meteen uitgevoerd. */
    constructor(){
      this.generateHSL();
    }

    /* Deze functie maakt een random waarde tussen 1 en 360 */
    generateHue = function(){
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    }

    /*functie maakt een random waarde tussen 11 en 79 */
    generateSaturation = function(){
        this.randomSaturation = Math.floor (Math.random() * (79 - 11) + 11) + "%";
    }

    /* deze functue maakt geen random waarden maaar waarde  tussen 11% en 100% */
    generateLightness = function(){
        this.randomLightness = Math.floor (Math.random() * (100 - 11) + 11) + "%";
    }

    /* Deze stuk code roept de 3 functies op. Elke functie hieronder maakt zijn eigen waarden. */
    generateHSL = function(){
        this.generateHue();
        this.generateSaturation();
        this.generateLightness();
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`

    }

}

class App{
    /* Dit zijn de elementen eerst */
    id;
    colorList;
    HSLGenerator;

    /* De id veranderen of stellen we in naar newId. */
    constructor(newId){
        this.id = newId;

        /* Hier maak ik ook een nieuwe color list aan met newId*/
        this.colorList = new ColorList(this.id);

        /* Hier maak een nieuwe hsl aan en dat sla ik meteen op in hslgenerator met: new HSLGenerator(); */
        this.HSLGenerator = new HSLGenerator();

        /* Hier actieveer ik generatecolorcards */
        this.generateColorCards();
    }

    generateColorCards = function(){

        /* Door middel van dit maken we de 100 verschillende hsl kleuren */
        for(let i = 1; i <= 100; i++){
            this.HSLGenerator.generateHSL();
            
            /* Hier maak ik een nieuwe colorcard object aan en zijn huidige waarde is de i. */
            new ColorCard(i, this.HSLGenerator.hsl, document.getElementById(this.colorList.id));
        }
    }
}


/* Ons code is ZOOOOO goed goed dat, we alleen met 1 zo een regel nieuwe apps meteen kunnen gaan toevoegen in ons dashboard */
const app = new App("js--app");
const app2 = new App("js--app--2");
const app3 = new App("js--app--3");


