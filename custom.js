filtro = {};
filtro.getConnectionId = function () {
    return (location.hash.split("#").pop() || "main");
}

onGoogleLogin = function (response) {
    let domain = location.hash.split("#").pop();
    const responsePayload = xdom.cryptography.decodeJwt(response.credential);
    xdom.session.login(responsePayload.email, response.credential, domain);
}

cuestionario = {}
cuestionario.getQR = function () {
    let domain = location.hash.split("#").pop();
    if (domain == 'minerva') {
        let respuestas = xdom.data.document.selectAll('//sintomatologia').map(rubro => rubro.nodeName + '=' + rubro.selectAll('*').reduce((output, o) => output += o.getAttribute("state:checked"), ""));
        xdom.fetch.xml(`http://qr.filtro.panax.io/QrGeneratorService.svc/EncodeFiltro/email=${xdom.data.document.documentElement.getAttribute("custom:email")}&datos=${respuestas}`).then(document => {
            respuesta = document.documentElement.textContent;
            if (respuesta.length == 32) {
                xdom.data.document.documentElement.setAttribute("custom:code", (respuesta || ""), true);
            } else {
                alert(respuesta)
            }
        });
    } else {
        let respuestas = xdom.data.document.selectAll('/*/*').map(rubro => cuestionario.formatValue(rubro));
        xdom.fetch.xml(`http://qr.filtro.panax.io/QrGeneratorService.svc/EncodeText/domain=${domain}&email=${xdom.data.document.documentElement.getAttribute("custom:email")}&datos=${respuestas}`).then(document => {
            respuesta = document.documentElement.textContent;
            if (respuesta.length == 32) {
                xdom.data.document.documentElement.setAttribute("custom:code", (respuesta || ""), true);
            } else {
                alert(respuesta)
            }

        });
    }
}

cuestionario.formatValue = function (node) {
    let return_value;
    if (node.selectSingleNode('opcion')) {
        return_value = node.nodeName + '=' + node.selectAll('*').reduce((output, o) => output += o.getAttribute("state:checked"), "")
    } else {
        return_value = node.nodeName + '=' + node.getAttribute("x:value");
    }
    return return_value;
}

cuestionario.load = async function () {
    let domain = location.hash.split("#").pop();
    //xdom.session.login(undefined, undefined, domain)
    let codigo = location.search.replace(/^\?uid=/, '');
    if (codigo) {
        await xdom.post.to("xdom/server/request.asp?command=Filtro.RegistrarEscaneo&@codigo=" + location.search.replace(/^\?uid=/, ''));
        xdom.session.loadSession(codigo).then(document => {
            if (!xdom.data.document.getStylesheets().length) {
                let codigo = location.search.replace(/^\?uid=/, '');
                xdom.data.document.addStylesheet({ type: "text/xsl", href: `${codigo}.xslt`, target: "body" });
            }
        });
    } else {
        let url;
        if (domain == 'minerva') {
            url = `xdom/server/request.asp?command=FiltroSalud.obtenerFormato&@Codigo=${location.search.replace(/^\?uid=/, '')}`
            xdom.fetch.xml(url).then(document => {
                let formato = xdom.xml.createDocument(document.selectSingleNode('x:response/formato/preguntas') || document);
                document.getStylesheets().map(stylesheet => {
                    formato.addStylesheet(stylesheet);
                })
                formato.documentElement.setAttribute("x:tag", "minerva");
                xdom.data.document = formato;
            });
        } else {
            url = `${domain}.xml`
            xdom.fetch.xml(url).then(document => {
                let formato = document;
                //document.getStylesheets().map(stylesheet => {
                //    formato.addStylesheet(stylesheet);
                //})
                formato.documentElement.setAttribute("x:tag", domain);
                xdom.data.document = formato;
            });

        }
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

function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        'Z' + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}