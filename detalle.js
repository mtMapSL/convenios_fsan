document.addEventListener("DOMContentLoaded", async function () {
  const labels = {
    normas_generales: "Normas grales.",
    jornada: "Jornada",
    empleo: "Empleo",
	permisos_excedencias: "Perm. y exced.",
    igualdad: "Igualdad",
    prevision_social: "Prev. social",
    derecho_sindical: "Dcho. sindical",
    salud_laboral: "Salud laboral",
    lgtbi: "LGTBI",
    pluses: "Pluses",

    // subcampos frecuentes
    ambito_funcional: "Ámbito funcional",
    ambito_personal: "Ámbito personal",
    ambito_temporal: "Ámbito temporal",
    ambito_territorial: "Ámbito territorial",
    prorroga: "Prórroga",
    denominacion: "Denominación",
    vigencia_duracion: "Vigencia y duración",
    medidas_no_discriminacion: "Medidas de no discriminación",
    protocolo_acoso: "Protocolo de acoso",
    comision_paritaria: "Comisión Paritaria",
    regimen_disciplinario: "Régimen disciplinario",
    clasificacion_profesional: "Clasificación profesional",
    movilidad_geografica: "Movilidad geográfica",
    movilidad_funcional: "Movilidad funcional",
    licencias_permisos: "Licencias y permisos",
    incapacidad_temporal: "Incapacidad temporal",
    periodo_prueba: "Período de prueba",
    contrato_fijo_discontinuo: "Contrato fijo-discontinuo",
    condiciones_mas_beneficiosas: "Condiciones más beneficiosas",
    compensacion_absorcion: "Compensación y absorción",
    organizacion_trabajo: "Organización del trabajo",
    horas_extraordinarias: "Horas extraordinarias",
	clausula_descuelgue: "Cláusula de descuelgue",
	mediacion_arbitraje: "Mediación y arbitraje",
	jornd_especiales_festivos: "Jornadas especiales y festivos",
	descanso_bocadillo: "Descanso del bocadillo",
	mudanza_traslado: "Mudanza o traslado",
	examenes: "Exámenes",
	consulta_medica: "Consulta médica",
	accidente_enfermedad_grave_hospitalizacion_intervencion_quirurgica: "Accidente, enfermedad grave, hospitalización o intervención quirúrgica",
	fomento_empleo: "Fomento del empleo",
	contratacion: "Contratación",
	eventuales_cp: "Eventuales por circunstancias de la producción",
	formacion: "Fomación",
	etts: "ETT",
	preaviso_cese: "Preaviso de cese",
	sucesion_empresas: "Sucesión de empresas",
	reduccion_jornada: "Reducción de jornada",
	promocion_y_ascensos: "Promoción y ascensos",
	maternidad_adopcion_acogimiento: "Nacimiento, adopción y acogimiento",
	no_discriminacion_diversidad: "No discriminación / diversidad",
	violencia_de_genero: "Violencia de género",
	acoso_sexual_y_por_razon_de_sexo: "Acoso sexual y por razón de sexo",
	poliza_seguro: "Póliza de seguro",
	seccion_sindical: "Sección sindical",
	formacion_sindical: "Formación sindical",
	tablon_local: "Tablón y local",
	comite_seguridad_y_salud: "Comité de Seguridad y Salud",
	comision_paritaria_salud_laboral: "Comisión Paritaria de Seguridad y Salud",
	reconocimiento_medico: "Reconocimiento médico",
	formacion_en_prl: "Formación en Prevención de Riesgos Laborales",
	seguridad_y_salud_laboral: "Seguridad y salud laboral",
	antiguedad: "Antigüedad",
	plus_transporte: "Plus de transporte",
	plus_distancia: "Plus de distancia",
	adaptacion_horario: "Adaptación de horario",
	proteccion_personal_sensible: "Protección del personal sensible"
  };

  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");

  const tituloEl = document.getElementById("detalleTitulo");
  const estadoEl = document.getElementById("detalleEstado");
  const tabsEl = document.getElementById("detalleTabs");
  const panelEl = document.getElementById("detallePanel");
  const provinciaSectorEl = document.getElementById("detalleProvinciaSector");
  
  const btnDescargar = document.getElementById("btnDescargar");

  function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value && String(value).trim() ? String(value).trim() : "—";
  }

  function formatEstado(raw) {
    if (!raw) return "";
    return raw.replace(/_/g, " ").toUpperCase();
  }

  function formatProvincia(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function aplicarTildes(texto) {
    const reemplazos = {
      ambito: "ámbito",
      area: "área",
      duracion: "duración",
      prorroga: "prórroga",
      periodo: "período",
      regimen: "régimen",
      comision: "comisión",
      geografia: "geografía",
      geografica: "geográfica",
      clasificacion: "clasificación",
      funcion: "función",
      funcional: "funcional",
      discriminacion: "discriminación",
      protocolo: "protocolo",
      acoso: "acoso",
      prevision: "previsión",
      sindical: "sindical",
      salud: "salud",
      laboral: "laboral",
      igualdad: "igualdad",
      empleo: "empleo",
      jornada: "jornada",
      pluses: "pluses",
      denominacion: "denominación",
      vigencia: "vigencia",
      general: "generales",
      generales: "generales",
      temporal: "temporal",
      territorial: "territorial",
      personal: "personal",
      funcional: "funcional",
      condiciones: "condiciones",
      mas: "más",
      beneficiosas: "beneficiosas",
      compensacion: "compensación",
      absorcion: "absorción",
      organizacion: "organización",
      trabajo: "trabajo",
      horas: "horas",
      extraordinarias: "extraordinarias",
      licencias: "licencias",
      permisos: "permisos",
      incapacidad: "incapacidad",
      jubilacion: "jubilación"
    };

    return texto
      .split(" ")
      .map(palabra => {
        const limpia = palabra.toLowerCase();
        return reemplazos[limpia] || limpia;
      })
      .join(" ");
  }

  function prettifyKey(key) {
    if (!key) return "";

    if (labels[key]) return labels[key];

    const base = key.replace(/_/g, " ").trim().toLowerCase();
    const conTildes = aplicarTildes(base);

    return conTildes.charAt(0).toUpperCase() + conTildes.slice(1);
  }

  function hasContent(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (typeof value === "object") return Object.values(value).some(hasContent);
    return true;
  }

  function extraerRangoFechas(texto) {
    if (!texto || typeof texto !== "string") return null;

    // Busca dos fechas dd/mm/yyyy o yyyy/mm/dd o yyyy-mm-dd dentro del texto
    const regex = /(\d{2}\/\d{2}\/\d{4}|\d{4}\/\d{2}\/\d{2}|\d{4}-\d{2}-\d{2})/g;
    const matches = texto.match(regex);

    if (!matches || matches.length < 2) return null;

    return {
      inicio: normalizarFecha(matches[0]),
      fin: normalizarFecha(matches[1])
    };
  }

  function normalizarFecha(fecha) {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
      return fecha;
    }

    if (/^\d{4}\/\d{2}\/\d{2}$/.test(fecha)) {
      const [yyyy, mm, dd] = fecha.split("/");
      return `${dd}/${mm}/${yyyy}`;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      const [yyyy, mm, dd] = fecha.split("-");
      return `${dd}/${mm}/${yyyy}`;
    }

    return fecha;
  }

  function calcularDuracion(vigenciaTexto) {
    const rango = extraerRangoFechas(vigenciaTexto);
    if (!rango) return "—";

    const [, , y1] = rango.inicio.split("/").map(Number);
    const [, , y2] = rango.fin.split("/").map(Number);

    const years = y2 - y1 + 1;
    if (years <= 0) return "—";

    return years === 1 ? "1 año" : `${years} años`;
  }

  function formatearVigencia(vigenciaTexto) {
    const rango = extraerRangoFechas(vigenciaTexto);
    if (!rango) return "—";
    return `${rango.inicio} - ${rango.fin}`;
  }

  function renderObject(obj) {
    const fragment = document.createDocumentFragment();

    Object.entries(obj).forEach(([key, value]) => {
      if (!hasContent(value)) return;

      // ocultar campos que no quieres repetir en el contenido
      if (key === "denominacion") return;
      if (key === "vigencia_duracion") return;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const section = document.createElement("section");
        section.className = "detalle-subsection";

        const h3 = document.createElement("h3");
        h3.textContent = prettifyKey(key);
        section.appendChild(h3);

        Object.entries(value).forEach(([subKey, subVal]) => {
          if (!hasContent(subVal)) return;

          // ocultar también aquí vigencia_duracion
          if (subKey === "vigencia_duracion") return;
          if (subKey === "denominacion") return;

          const item = document.createElement("div");
          item.className = "detalle-item";

          const h4 = document.createElement("h4");
          h4.textContent = prettifyKey(subKey);

          const p = document.createElement("p");
          p.textContent = subVal;

          item.appendChild(h4);
          item.appendChild(p);
          section.appendChild(item);
        });

        // solo añadir la subsection si quedó algo dentro
        if (section.children.length > 1) {
          fragment.appendChild(section);
        }
      } else {
        const item = document.createElement("div");
        item.className = "detalle-item";

        const h3 = document.createElement("h3");
        h3.textContent = prettifyKey(key);

        const p = document.createElement("p");
        p.textContent = value;

        item.appendChild(h3);
        item.appendChild(p);
        fragment.appendChild(item);
      }
    });

    return fragment;
  }

  function activateTab(tabButton, content) {
    document.querySelectorAll(".detalle-tab").forEach(btn => {
      btn.classList.remove("activa");
      btn.setAttribute("aria-selected", "false");
    });

    tabButton.classList.add("activa");
    tabButton.setAttribute("aria-selected", "true");

    panelEl.innerHTML = "";
    panelEl.appendChild(renderObject(content));
  }

  let conveniosData = [];

  try {
    const response = await fetch("convenios.json");
    conveniosData = await response.json();
  } catch (error) {
    tituloEl.textContent = "No se ha podido cargar el convenio";
    panelEl.innerHTML = '<p class="detalle-empty">Error cargando convenios.json.</p>';
    console.error(error);
    return;
  }

  const convenio = conveniosData.find(item => item.codigo === codigo);
  
  if (btnDescargar) {
	  if (convenio?.pdf && String(convenio.pdf).trim()) {
		btnDescargar.href = `./docs/${convenio.pdf}`;
		btnDescargar.hidden = false;
	  } else {
		btnDescargar.hidden = true;
	  }
  }

  if (!convenio) {
    tituloEl.textContent = "Convenio no encontrado";
    panelEl.innerHTML = '<p class="detalle-empty">No se ha encontrado ningún convenio con ese código.</p>';
    return;
  }

  // título completo
  const denominacionCompleta =
    convenio?.detalle?.normas_generales?.denominacion ||
    convenio.denominacion ||
    convenio.nombre ||
    convenio.nombre_html ||
    "Convenio";

  tituloEl.textContent = denominacionCompleta;
  document.title = `${denominacionCompleta} | Detalle del convenio`;

  // estado
  const estadoRaw = convenio.estado || convenio.contenido;
  if (estadoRaw && String(estadoRaw).trim()) {
    estadoEl.hidden = false;
    estadoEl.textContent = formatEstado(estadoRaw);

    const estadoClass = String(estadoRaw).toLowerCase();
    if (["vigente", "negociacion", "ultraactividad", "caducado"].includes(estadoClass)) {
      estadoEl.classList.add(estadoClass);
    }
  }

  // Metadatos superiores
  const vigenciaTexto =
    convenio?.detalle?.vigencia_duracion ||
    convenio.vigencia_duracion ||
    convenio.vigencia ||
    "";

  setText("metaCodigo", convenio.codigo);
  setText("metaAmbito", convenio.ambito || "Provincial");
  setText("metaArea", formatProvincia(convenio.provincia));
  setText("metaVigencia", formatearVigencia(vigenciaTexto));
  setText("metaDuracion", calcularDuracion(vigenciaTexto));
  
  let publicacionTexto = "—";
  if (convenio.publicacion && convenio.publicacion_diario) {
	publicacionTexto = `${convenio.publicacion_diario} (${convenio.publicacion})`;
  } else if (convenio.publicacion_diario) {
	publicacionTexto = convenio.publicacion_diario;
  } else if (convenio.publicacion) {
	publicacionTexto = convenio.publicacion;
  }
  setText("metaPublicacion", publicacionTexto); 

  const detalle = convenio.detalle || {};
  const availableTabs = Object.entries(detalle).filter(([, value]) => hasContent(value));

  if (!availableTabs.length) {
    panelEl.innerHTML = '<p class="detalle-empty">Todavía no hay contenido de detalle cargado para este convenio.</p>';
    tabsEl.innerHTML = "";
    return;
  }

  availableTabs.forEach(([key, value], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "detalle-tab";
    button.textContent = prettifyKey(key);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");

    button.addEventListener("click", () => activateTab(button, value));
    tabsEl.appendChild(button);

    if (index === 0) {
      button.classList.add("activa");
      panelEl.innerHTML = "";
      panelEl.appendChild(renderObject(value));
    }
  });
  
  const provincia = formatProvincia(convenio.provincia);
  const bloqueActividad =
  convenio.subsector ||
  convenio.sector ||
  "";

	if (provinciaSectorEl) {
	  provinciaSectorEl.textContent = `${provincia} · ${bloqueActividad}`;
	}
  
});
