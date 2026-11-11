/* eslint-disable no-undef */

export default async function handler(req, res) {
  const URL = process.env.NOCODB_URL;
  const TOKEN = process.env.NOCODB_API_TOKEN;
  const TABLE_ID = process.env.NOCODB_TABLE_ID;

  if (!URL || !TOKEN || !TABLE_ID) {
    return res.status(500).json({
      error: "Falta configurar NocoDB"
    });
  }

  const endpoint =
    `${URL.replace(/\/$/, "")}/api/v2/tables/${TABLE_ID}/records`;

  try {
    if (req.method === "POST") {
      const { nombre, punteo, total, porcentaje } = req.body || {};

      if (
        !nombre ||
        punteo === undefined ||
        total === undefined ||
        porcentaje === undefined
      ) {
        return res.status(400).json({
          error: "Faltan datos de la evaluación",
          recibido: req.body
        });
      }

      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xc-token": TOKEN
        },
        body: JSON.stringify([
          {
            fields: {
              nombre: nombre,
              punteo: Number(punteo),
              total: Number(total),
              porcentaje: Number(porcentaje)
            }
          }
        ])
      });

      const datos = await respuesta.json();

      return res.status(respuesta.ok ? 201 : respuesta.status)
        .json(datos);
    }

    if (req.method === "GET") {
      const respuesta = await fetch(endpoint, {
        headers: {
          "xc-token": TOKEN
        }
      });

      const datos = await respuesta.json();

      return res.status(respuesta.ok ? 200 : respuesta.status)
        .json(datos);
    }

    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      error: "Método no permitido"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error de conexión con NocoDB",
      detalle: error.message
    });
  }
}
