﻿cuestionario = {}
cuestionario.getQR = function () {
    let respuestas = xdom.data.document.selectAll('//sintomatologia').map(rubro => rubro.nodeName + '=' + rubro.selectAll('*').reduce((output, o) => output += o.getAttribute("state:checked"), ""));
    xdom.fetch.xml(`http://qr.filtro.panax.io/QrGeneratorService.svc/EncodeText/email=${xdom.data.document.documentElement.getAttribute("custom:email")}&datos=${respuestas}`).then(document => {
        respuesta = document.documentElement.textContent;
        if (respuesta.length == 32) {
            xdom.data.document.documentElement.setAttribute("custom:code", (respuesta || ""), true);
        } else {
            alert(respuesta)
        }

    });
}

cuestionario.load = function () {
    let codigo = location.search.replace(/^\?uid=/, '');
    if (codigo) {
        xdom.session.loadSession(codigo);
    } else {
        xdom.fetch.xml("xdom/server/request.asp?command=FiltroSalud.obtenerFormato&@Codigo=" + location.search.replace(/^\?uid=/, '')).then(document => {
            let formato = xdom.xml.createDocument(document.selectSingleNode('x:response/formato/preguntas'));
            document.getStylesheets().map(stylesheet => {
                formato.addStylesheet(stylesheet);
            })
            formato.documentElement.setAttribute("x:tag", "minerva");
            xdom.data.document = formato;
        });
    }
}

cuestionario.updateNode = function (value) {
    xdom.data.document.selectSingleNode(`//opcion[${getCurrentSlide()}]`).setAttribute('state:checked', value, false);
}

cuestionario.closeSession = function () {
    xdom.data.document.selectAll('//@state:checked').remove();
    xdom.data.document.selectAll('//@custom:code').remove();
    xdom.data.document.selectAll('//preguntas/*/@state:active').remove();
    xdom.data.document.documentElement.setAttribute('custom:email', undefined);
}

function getCurrentSlide() {
    return parseInt(document.querySelector('#myCarousel .carousel-indicators .active').getAttribute('data-bs-slide-to')) + 1
}