function dopoOperazione() { 
    console.log("CALLBACK - operazioni concluse");
}

function funzionePrincipale (callback) { 
    console.log("Inizio operazione asincrona");

    setTimeout(funtion (){ 
        console.log("Fine operazione asincrona");
        callback();
    }, 2500);
}

console.log("Inizio script js");
funzionePrincipale(dopoOperazione);