cuestionario = {}
bitacora = {}
xdom.manifest.sources = (xdom.manifest.sources || {});

bitacora.load = async function () {
    let formato = await xdom.fetch.xml(`xdom/server/request.asp?command=FiltroSalud.obtenerBitacora&@fecha_inicio='20210614'&@fecha_final='20210619'`);
    formato.documentElement.setAttribute("x:tag", "bitacora");
    return formato;
}
xdom.manifest.sources["#bitacora"] = bitacora.load;
xdom.manifest.sources["#"] = "#bitacora";
