document.addEventListener("DOMContentLoaded", async function () {
  let conveniosData = [];

  try {
    const response = await fetch("convenios.json");
    conveniosData = await response.json();
  } catch (error) {
    console.error("Error cargando convenios.json:", error);
  }

  const mapaConvenios = {};
  conveniosData.forEach(c => {
    mapaConvenios[c.codigo] = c;
  });

  const provinciaButtons = document.querySelectorAll(".provincia-filtro[data-provincia]");
  const estadoButtons = document.querySelectorAll(".leyenda-estados [data-estado]");
  const sectorButtons = document.querySelectorAll(".leyenda-sectores [data-sector]");

  const secciones = Array.from(document.querySelectorAll(".container > h2[id]"))
    .map(titulo => {
      const provincia = titulo.nextElementSibling;
      if (!provincia || !provincia.classList.contains("provincia")) return null;

      return {
        id: titulo.id,
        titulo,
        provincia,
        convenios: Array.from(provincia.querySelectorAll("li"))
      };
    })
    .filter(Boolean);

  const filtrosProvincia = new Set();
  const filtrosEstado = new Set();
  const filtrosSector = new Set();

  function actualizarBotones() {
    provinciaButtons.forEach(btn => {
      const activo = filtrosProvincia.has(btn.dataset.provincia);
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
    });

    estadoButtons.forEach(btn => {
      const activo = filtrosEstado.has(btn.dataset.estado);
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
    });

    sectorButtons.forEach(btn => {
      const activo = filtrosSector.has(btn.dataset.sector);
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
    });
  }

  function aplicarFiltros() {
    secciones.forEach(({ id, titulo, provincia, convenios }) => {
      const provinciaCoincide =
        filtrosProvincia.size === 0 || filtrosProvincia.has(id);

      let visibles = 0;

      convenios.forEach(li => {
        const codigo = li.dataset.codigo;
        const datos = mapaConvenios[codigo];

        const estadoCoincide =
          filtrosEstado.size === 0 ||
          Array.from(filtrosEstado).some(estado => li.classList.contains(estado));

        let sectorCoincide = true;

        if (filtrosSector.size > 0) {
          if (!datos) {
            sectorCoincide = false;
          } else {
            sectorCoincide = filtrosSector.has(datos.sector);
          }
        }

        const mostrar = provinciaCoincide && estadoCoincide && sectorCoincide;

        li.style.display = mostrar ? "" : "none";

        if (mostrar) visibles++;
      });

      titulo.style.display = visibles ? "" : "none";
      provincia.style.display = visibles ? "flex" : "none";
    });

    actualizarBotones();
  }

  provinciaButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const provincia = this.dataset.provincia;

      if (filtrosProvincia.has(provincia)) {
        filtrosProvincia.delete(provincia);
      } else {
        filtrosProvincia.add(provincia);
      }

      aplicarFiltros();
    });
  });

  estadoButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const estado = this.dataset.estado;

      if (filtrosEstado.has(estado)) {
        filtrosEstado.delete(estado);
      } else {
        filtrosEstado.add(estado);
      }

      aplicarFiltros();
    });
  });

  sectorButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const sector = this.dataset.sector;

      if (filtrosSector.has(sector)) {
        filtrosSector.delete(sector);
      } else {
        filtrosSector.add(sector);
      }

      aplicarFiltros();
    });
  });

  document.querySelectorAll(".icono-detalle").forEach(btn => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const li = this.closest("li[data-codigo]");
      if (!li) return;
      const codigo = li.dataset.codigo;
      if (!codigo) return;
      /* window.location.href = `detalle.html?codigo=${encodeURIComponent(codigo)}`; */
	  window.open(`detalle.html?codigo=${encodeURIComponent(codigo)}`, "_blank", "noopener");
    });
  });

  aplicarFiltros();
});