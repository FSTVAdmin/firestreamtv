// URL del archivo de texto que deseas descargar
const url =
  "https://raw.githubusercontent.com/FSTVAdmin/juanSebastian/main/base.txt";
var canales = [];

descargarArchivo(url)
  .then((data) => {
    // Guardar el contenido descargado en la variable m3u
    const m3u = data;
    //console.log('Archivo descargado correctamente.');
    //console.log(m3u);
    //console.log("----------------------------");
    const array = m3u.split("#EXTINF:-1");
    array.shift(); //Elimino el primero
    const regexGrupo = /group-title="([^"]*)"/;
    const regexNombre = /tvg-id="([^"]*)"/;
    const regexLogo = /tvg-logo="([^"]*)"/;
    array.forEach((element) => {
      //console.log(element);
      //Grupo group-title="
      var matchGrupo = element.match(regexGrupo);
      var grupo = matchGrupo[1];
      grupo = grupo.trim();
      //Nombre tvg-id="
      var matchNombre = element.match(regexNombre);
      var nombre = matchNombre[1];
      nombre = nombre.trim();
      //Logo tvg-logo="
      var matchLogo = element.match(regexLogo);
      var logo = matchLogo[1];
      logo = logo.trim();
      //Enlace acestream:// a final
      var iEnlace = element.indexOf("acestream");
      var enlace = element.substring(iEnlace);
      enlace = enlace.trim();
      //Descripcion " , a acestream://
      var p = element.lastIndexOf(",", iEnlace);
      var descripcion = element.substring(p + 1, iEnlace - 5);
      descripcion = descripcion.trim();
      //
      //console.log(grupo);
      //console.log(nombre);
      //console.log(logo);
      //console.log(enlace);
      //console.log(descripcion);

      canales.push({
        Nombre: nombre,
        Grupo: grupo,
        Logo: logo,
        Enlace: enlace,
        Desripcion: descripcion,
      });
    });
    canales.forEach((canal) => {
      //console.log(canal.Nombre);
      var section = document.getElementById('seccionCanales');
      // Crear el elemento <article> con la clase "style2"
      var article = document.createElement("article");
      article.className = "style1";

      // Crear el elemento <span> con la clase "image"
      var span = document.createElement("span");
      span.className = "image";

      // Crear el elemento <img> con el atributo src y alt
      var img = document.createElement("img");
      img.src = canal.Logo;
      img.alt = canal.Nombre;

      // Agregar el elemento <img> como hijo del elemento <span>
      span.appendChild(img);

      // Crear el elemento <a> con el atributo href
      var link = document.createElement("a");
      link.href = canal.Enlace;
      link.setAttribute('onclick', 'clicky.log(\''+canal.Enlace+'\',\''+canal.Desripcion+'\')');
      //link.setAttribute('onclick', 'clicky.log(\''+canal.Enlace+'\',\'Ver canal\')');

      // Crear el elemento <h2> y establecer su contenido de texto
      var heading = document.createElement("h2");
      heading.textContent = canal.Nombre;

      // Crear el elemento <div> con la clase "content"
      var div = document.createElement("div");
      div.className = "content";

      // Crear el elemento <p> y establecer su contenido de texto
      var paragraph = document.createElement("p");
      paragraph.textContent =
        canal.Desripcion;

      // Agregar el elemento <h2> y <p> como hijos del elemento <div>
      div.appendChild(heading);
      div.appendChild(paragraph);

      // Agregar el elemento <div> como hijo del elemento <a>
      link.appendChild(div);

        //Crear un titulo/nombre
        var titulo = document.createElement("h1");
        titulo.textContent = canal.Desripcion;

      // Agregar el elemento <span> y <a> como hijos del elemento <article>
      article.appendChild(span);
      article.appendChild(link);
      article.appendChild(titulo);

      // Agregar el elemento <article> al documento (por ejemplo, al body)
      //document.body.appendChild(article);
      section.appendChild(article);
    });
  })
  .catch((error) => {
    console.error("Error al descargar el archivo:", error);
  });

function descargarArchivo(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(
        `La descarga falló. Código de estado: ${response.status}`
      );
    }
    return response.text();
  });
}
