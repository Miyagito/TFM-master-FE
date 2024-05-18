export const normalizeLawData = (ley) => {
  if (ley && ley.data) {
    // Estructura que contiene `ley.data`
    return ley.data.map((item) => ({
      tipo: item.tipo,
      contenido: item.texto,
      children: item.contenido
        ? item.contenido.map((subItem) => ({
            tipo: subItem.tipo,
            contenido: subItem.texto,
          }))
        : [],
    }));
  } else if (ley) {
    // Estructura que contiene `ley`
    return ley.map((item) => ({
      tipo: item.tipo,
      contenido: item.contenido,
      children: item.children
        ? item.children.map((subItem) => ({
            tipo: subItem.tipo,
            contenido: subItem.contenido,
          }))
        : [],
    }));
  } else {
    return [];
  }
};
