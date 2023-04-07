// prendere tutti gli elementi che mi servono dal DOM

const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const synthFigure = document.querySelector('figure');

// lista delle voci del sintetizzatore da poter assegnare, creiamo l'array
let voices = [];
speechSynthesis.addEventListener('voiceschanged', function() {
    voices = speechSynthesis.getVoices();
  // console.log(voices); lista delle voci da prendere
});

// In attesa di click bottone. trim() toglie gli spazi dal conteggio
playButton.addEventListener('click', function() {
    const textLength = textArea.value.trim().length; //Prendi la textarea, leggi il valore, elimina gli spazi, dimmi quanto è lungo.

  if(textLength > 0) {
    synthesizer(); 
  }  

});

// Preparo funzione esterna
function synthesizer() {
    // 1 - recuperiamo pitch e text (creiamo variabili della funzione)
    const text = textArea.value;
    const pitch = pitchBar.value;

    //2 - Frase per il sintetizzatore vocale, prendendo il modello di SpeechSynthesisUtterance 
    const utterance = new SpeechSynthesisUtterance(text);

    //3 - specifichiamo altri dettagli per la frase
    utterance.volume = 1; // volume, valore default è 1
    utterance.rate = 1; // velocità frase, valore default è 1
    utterance.pitch = pitch; // il valore lo prendiamo dalla variabile pitch a cui è assegnato il valore della pitchBar che prende l'input dell'elemento 
    
    //3.bis - assegnamo qualche voce differente con IF condition che va a pescare le voci in base al nome
    const anotherVoice = voices.find(function (voice) {
      if (voice.name.includes('David')) {
        return true;
      }
    });

    //assegnazione voce dettaglio frase
    utterance.voice = anotherVoice;

    //il sintetizzatore parla
    speechSynthesis.speak(utterance);

    //appena il sintetizzatore parla:
    utterance.addEventListener('start', function() {
        //bloccare i controlli quando si attiva la voce
        textArea.disabled = true;
        pitchBar.disabled = true;
        playButton.disabled = true;
        //cambio immagine, aggiungendo la classe al tag figure, grazie ai display nel CSS
        synthFigure.classList.add('voice');
    });

    //cambio immagine alla fine del parlato
    utterance.addEventListener('end', function() {
       //sbloccare i controlli quando finisce la voce
       textArea.disabled = false;
       pitchBar.disabled = false;
       playButton.disabled = false;
      // riproponiamo l'immagine originale quando finisce il parlato
      synthFigure.classList.remove('voice');
    });

}