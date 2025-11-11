// ==UserScript==
// @name         Plano de Fundo: Zendesk
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  try to take over the world!!
// @author       You
// @match        https://smileshelp.zendesk.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://raw.githubusercontent.com/Higor-Alm/Background-Change/main/main.js
// @downloadURL  https://raw.githubusercontent.com/Higor-Alm/Background-Change/main/main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var iterador = 0;
    var isDark = true;
    const exceptionList = ['additionalContent', 'contentBox', 'contentBox2', 'botaoAcordo', 'botaoChat', 'botaoAvaliacao'];
    const placeholderExceptions = ['para', 'assunto'];
    const imgList = { // lista com url de imagens
        fundoSabre: {url: "https://www.mundorh.com.br/wp-content/uploads/2020/01/gol-avi%C3%A3o-scaled.jpg", isDark: true},
        fundoCave: {url: "https://i.pinimg.com/originals/76/aa/24/76aa24bf1e433a13444c18c5df7b839b.gif", isDark: false},
        fundoCity: {url: "https://wallpapercave.com/wp/wp2763891.gif", isDark: false},
        fundoCity2: {url: "https://wallpapercave.com/wp/wp2757834.gif", isDark: false},
        fundoAdventureTime: {url: "https://wallpapercave.com/wp/wp2757868.gif", isDark: false},
        fundoSpaceship: {url: "https://wallpaperaccess.com/full/7270381.gif", isDark: false},
        fundoCahoots: {url: "https://i.redd.it/uwwte8wps4h91.gif", isDark: false}
    }
    const color = {
        white: 'rgba(255, 255, 255)',
        black: 'rgba(0, 0, 0)'
    };
    const colorTrans = {
        whiteLight: 'rgba(255, 255, 255, 0.3)',
        whiteMid: 'rgba(255, 255, 255, 0.4)',
        whiteHeavy: 'rgba(255, 255, 255, 0.5)',
        blackLight: 'rgba(0, 0, 0, 0.3)',
        blackMid: 'rgba(0, 0, 0, 0.4)',
        blackHeavy: 'rgba(0, 0, 0, 0.5)'

    };

    let isException = false;
    const botaoTeste = document.createElement('button');
    botaoTeste.id = 'botaoTeste';
    botaoTeste.textContent = 'Switch Img';
    const campoCor = document.createElement('input');
    campoCor.id = 'campoCor';
    campoCor.type = 'color';
    const campoCorBox = document.createElement('input');
    campoCorBox.id = 'campoCorBox';
    campoCorBox.type = 'checkbox';
    const customImgUrl = document.createElement('input');
    customImgUrl.type = 'text';
    customImgUrl.id = 'customImgUrl';
    const customImgUrlCheckbox = document.createElement('input');
    customImgUrlCheckbox.type = 'checkbox';
    customImgUrlCheckbox.id = 'customImgUrlCheckbox';

    botaoTeste.style.cssText = `
    position: fixed;
    bottom: 10%;
    left: 0%;
    max-width: 60px;
    border: solid 5px #ce1f1f;
`;

    campoCor.style.cssText = `
    position: fixed;
    bottom: 15%;
    left: 0%;
    max-width: 60px;
    border: solid 5px #ce1f1f;
`;

    campoCorBox.style.cssText = `
    position: fixed;
    bottom: 18%;
    left: 0%;
    border: solid 5px #ce1f1f;
`;

    customImgUrl.style.cssText = `
    position: fixed;
    bottom: 20%;
    left: 0%;
    border: solid 5px #ce1f1f;
    display: none;
`;

    customImgUrlCheckbox.style.cssText = `
    position: fixed;
    bottom: 22%;
    left: 0%;
    border: solid 5px #ce1f1f;
`;

    botaoTeste.addEventListener('click', () =>{
        console.log(iterador);
        if(!(document.querySelector('#customImgUrlCheckbox').checked)){
            switch(iterador){
                case 0:
                    setBackgroundImage(imgList.fundoSabre);
                    break;
                case 1:
                    setBackgroundImage(imgList.fundoCave);
                    break;
                case 2:
                    setBackgroundImage(imgList.fundoCity);
                    break;
                case 3:
                    setBackgroundImage(imgList.fundoCity2);
                    break;
                case 4:
                    setBackgroundImage(imgList.fundoAdventureTime);
                    break;
                case 5:
                    setBackgroundImage(imgList.fundoSpaceship);
                    break;
                case 6:
                    setBackgroundImage(imgList.fundoCahoots);
                    break;
            }

            iterador = iterador < 6 ? iterador + 1 : 0;
        }else if(document.querySelector('#customImgUrlCheckbox').checked){
            var splitText = document.querySelector('#customImgUrl').value.split('|');

            if(splitText.length < 2){splitText.append('true')}

            setBackgroundImage({url: splitText[0], isDark: splitText[1]})
        }

    });

    customImgUrlCheckbox.addEventListener('change', function () {
        if (!customImgUrlCheckbox.checked) {
            document.querySelector('#customImgUrl').style.display = 'none';
        }
    });

    setInterval(() => {
            document.querySelectorAll('*').forEach((element) => {
                if(!exceptionList.includes(element.id)){
                    element.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                    if(element.id.includes('downshift')){
                        element.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
                    }

                    if(element.classList.contains('zendesk-editor--rich-text-container')){
                        element.style.backgroundImage = 'none';
                    }

                    if(element.tagName == 'header'){
                        element.style.background = 'none';
                        element.background = 'none';
                    }

                    for (const key in element.dataset) {
                        // console.log(`${key}: ${element.dataset[key]}`);
                        if(element.tagName.toLowerCase() == 'textarea'){
                            element.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0.3)';
                        }
                    }

                    if(element.tagName == 'LABEL'){ // ########### TAGNAME 'label' PÓS ###########
                        element.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    }
                }
            });

            document.querySelectorAll('p').forEach((element) => { // ########### TAGNAME 'p' PÓS ###########
                    element.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            });

            if(isDark){
                document.querySelectorAll('*').forEach((element) => {
                    if(!exceptionList.includes(element.id)){
                        if(element.textContent){
                            element.style.color = 'rgba(0, 0, 0)';

                            try{
                                if(campoCorBox.checked){
                                    element.style.color = campoCor.value;
                                }
                            }catch(error){
                                console.log(error);
                            }
                        }
                    }
                });

                document.querySelectorAll('*').forEach((element) => {
                    if(element.tagName.toLowerCase() == 'input' || element.tagName.toLowerCase() == 'textarea') {
                        element.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                    }
                });
            } else {
                document.querySelectorAll('*').forEach((element) => {
                    if(!exceptionList.includes(element.id)){
                        if(element.textContent){
                            element.style.color = 'rgba(255, 255, 255)';

                            try{
                                if(campoCorBox.checked){
                                    element.style.color = campoCor.value;
                                }
                            }catch(error){
                                console.log(error);
                            }
                        }

                        if(element.tagName.toLowerCase() == 'input' || element.tagName.toLowerCase() == 'textarea') {
                            element.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                        }

                        try{
                            if(placeholderExceptions.includes(element.placeholder.toLowerCase())){
                                element.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                                element.style.color = 'rgba(255, 255, 255)';

                                try{
                                    if(campoCorBox.checked){
                                        element.style.color = campoCor.value;
                                    }
                                }catch(error){
                                    console.log(error);
                                }
                            }
                        }catch (error){
                            null;
                        }
                    }
                });
            }

            document.querySelectorAll('svg')[7].style.backgroundColor = isDark ? '' : 'rgba(255, 255, 255, 0.8)';
            document.querySelectorAll('svg')[8].style.backgroundColor = isDark ? '' : 'rgba(255, 255, 255, 0.8)';
            document.querySelectorAll('svg')[9].style.backgroundColor = isDark ? '' : 'rgba(255, 255, 255, 0.8)';
            document.querySelectorAll('svg')[10].style.backgroundColor = isDark ? '' : 'rgba(255, 255, 255, 0.8)';

            try{
                document.querySelectorAll("#ember3027 > div > div.sc-9os9l3-0.hJEMSe > div > div.sc-1x3zb4y-0.cqNcre > div").forEach((element) => { // #### AREA HEADER TICKETS ####
                    element.style.backgroundColor = 'rgba(255, 255, 255)';
                    document.querySelector("#\\:r8l\\: > div > div > div.sc-1g65fhz-0.cHDnAK.zendesk-editor--rich-text-container").style.backgroundImage = 'none';
                });
            }catch(error){
                console.log(error);
            }

            document.querySelector('#transcriptionBox').style.backgroundColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
            document.querySelector('#transcriptionControls').style.backgroundColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
    }, 1000);

    function setBackgroundImage(_fundo){
        isDark = _fundo.isDark;
        document.querySelector("#wrapper").style.backgroundSize = 'cover';
        document.querySelector("#wrapper").style.backgroundPosition = 'center';
        document.querySelector("#wrapper").style.backgroundImage = `url(${_fundo.url})`;
    }

    function addControlInterface(){
        document.querySelector("#main_navigation").appendChild(botaoTeste);
        document.querySelector("#main_navigation").appendChild(campoCor);
        document.querySelector("#main_navigation").appendChild(campoCorBox);
        document.querySelector("#main_navigation").appendChild(customImgUrl);
        document.querySelector("#main_navigation").appendChild(customImgUrlCheckbox);
    }

setTimeout(() => {
    setBackgroundImage(imgList.fundoSabre);
    addControlInterface();
}, 6000);
})();
