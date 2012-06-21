COMPATIBILITATE (browsere)
==========================

Firefox, Opera, IE, Safari, Chrome (Windows 7)
Android 3 Chrome (Asus Eee Pad)


INSTALARE
=========

De plasat toate fisierele din arhiva http://labs.lungu.info/geotweet/geotweet.zip într-o mapa pe orice server HTTP.

Pentru ca Twitter login/retweet sa lucreze e nevoie sa face una din urmatoarele:
* sa accesati situl de pe un host de tip http://localhost/
* sa creati o aplicatie Twitter @Anywhere si sa ajustati cheia API din


TEHNOLOGII 3RD PARTY
====================

* jQuery: pentru ca face viata mai simpla :)
* jsrender: (plugin jQuery) pentru a putea usor ajusta template-ul de afisare a tweet-urilor
* maxmind.com geoip: pentru pozitionarea primara
* HTML5 geolocation API: pentru a incerca pozitionarea mai exacta
* Google Maps: pentru a face intreg procesul de pozitionare/ajustare mai simplu (necesita API key; cheia inclusa nu are restrictii referitor la domain)
* Tweeter @Anywhere: pentru login, retweet (necesita API key; cheia inclusa lucreaza doar pe localhost si labs.lungu.info)



STRUCTURE APLICATIEI
====================

Am separat codule conform urmatoarei structuri:
* index.html - landing page
* css/ - stiluri CSS
* js/
** app.js - codul ce executa logica specifica aplicatiei si care depinde de structura index.html
** vendor/ - biblioteci 3rd party (ce nu sunt accesibile de pe un CDN)
** lib/ - componente reutilizabile
*** tweets.js - incarca tweet-urile si le afiseaza
*** map.js - afiseaza harta cu toate elementele sale; utilizeaza un callback pentru a notifica o achimbare a pozitie selectate pe harta

In cele 2 componente create am utilizat modalitati diferite de organizare a codului:
* tweets.js - foloseste un pattern-ul statndard de scriere a plugin-urilor jQuery
* map.js - foloseste un contructorul clasic si prototipul; integrarea in aplicatie e facuta print-un funtie-plugin jQuery


Proiectul actual, daca ar evolua in ceva mai mare probabil ar mai primi:
* prefixe pentru DOM ID/clasele css
* un stack de functii JS pentru initiliazarea unei bucati de DOM incarcata prin AJAX si a nu necesita chestii ca $.fn.live(...)
