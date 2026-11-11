
export async function guardarResultadoNocoDB(datos) {
  const respuesta = await fetch("/api/resultados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });

  const resultado = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    console.error("Error detallado al guardar:", resultado);

    throw new Error(
      resultado.msg ||
      resultado.message ||
      resultado.error ||
      JSON.stringify(resultado) ||
      "Error al guardar el resultado"
    );
  }

  return resultado;
}

export async function obtenerResultadosNocoDB() {
  const respuesta = await fetch("/api/resultados");

  const resultado = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    console.error("Error al consultar:", resultado);

    throw new Error(
      resultado.msg ||
      resultado.message ||
      resultado.error ||
      "Error al consultar los resultados"
    );
  }

  return resultado;
}
