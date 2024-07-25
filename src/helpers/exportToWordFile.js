import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Header,
  ImageRun,
} from "docx";

async function fetchImageAsBase64(imagePath) {
  // Asegúrate de que la ruta comienza con un '/', lo que indica que es relativa al directorio raíz del servidor.
  const response = await fetch(`${process.env.PUBLIC_URL}${imagePath}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Remover la parte de URL de datos, docx espera solo la cadena base64.
      const base64String = reader.result.replace(/^data:.+;base64,/, "");
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const processItemToParagraph = (item) => {
  let runProps = {
    font: "Arial",
    size: 20,
    bold: false,
    alignment: AlignmentType.JUSTIFIED,
  };

  if (
    [
      "titulo",
      "titulo_num",
      "titulo_tit",
      "capitulo_num",
      "capitulo_tit",
      "titulo_preambulo",
      "centro_redonda",
    ].includes(item.tipo)
  ) {
    runProps.size = item.tipo === "titulo_preambulo" ? 30 : 28;
    runProps.bold = ["titulo_tit", "capitulo_tit"].includes(item.tipo);
    runProps.alignment = AlignmentType.CENTER;
  } else if (item.tipo === "articulo") {
    runProps.size = 26;
    runProps.bold = true;
    runProps.alignment = AlignmentType.JUSTIFIED;
  } else {
    runProps.alignment = AlignmentType.JUSTIFIED;
  }

  const paragraphs = [
    new Paragraph({
      children: [
        new TextRun({
          text: item.texto || item.contenido || "",
          ...runProps,
        }),
      ],
      alignment: runProps.alignment,
    }),
    new Paragraph({
      children: [new TextRun({ text: " ", break: 1 })],
    }),
  ];

  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      paragraphs.push(...processItemToParagraph(child));
    });
  }

  return paragraphs;
};

export const exportToWord = async (data, law) => {
  const { nombre, seccion, departamento, referencia, publicadoEn } = law;

  const parts = referencia ? referencia.split("-") : [""];
  const numeroReferencia = parts.pop();

  const numBoletinMatch = publicadoEn ? publicadoEn.match(/núm\. (\d+)/) : "";
  const numBoletin = numBoletinMatch ? numBoletinMatch[1] : "No disponible";

  const fechaMatch = publicadoEn ? publicadoEn.match(/de (.+),/) : "";
  const fecha = fechaMatch ? fechaMatch[1] : "No disponible";

  const logoBase64 = await fetchImageAsBase64("/logo.png");
  const escudoBase64 = await fetchImageAsBase64("/escudo.png");

  const doc = new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logoBase64,
                    transformation: { width: 50, height: 25 },
                  }),
                  new TextRun({
                    text: `     BOLETÍN OFICIAL DEL ESTADO       `,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    size: 40,
                    color: "0000FF",
                  }),
                  new ImageRun({
                    data: escudoBase64,
                    transformation: { width: 25, height: 25 },
                  }),
                  new TextRun({
                    text: "________________________________________________________________________________________________________________________________",
                    color: "0000FF",
                    size: 14,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Núm. ${numBoletin}`,
                    bold: true,
                    size: 20,
                    color: "0000FF",
                  }),
                  new TextRun({
                    text: `    ${fecha}`,
                    size: 20,
                    color: "0000FF",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "________________________________________________________________________________________________________________________________",
                    color: "0000FF",
                    size: 14,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 300 },
              }),
            ],
          }),
        },

        children: [
          new Paragraph({
            text: departamento ? departamento.toUpperCase() : " ",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            children: [new TextRun({ text: " " })],
            spacing: {
              after: 120,
            },
          }),

          new Paragraph({
            text: seccion,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: " " })],
            spacing: {
              after: 120,
            },
          }),
          new Paragraph({
            text: `${numeroReferencia}    ${nombre}`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: " " })],
            spacing: {
              after: 120,
            },
          }),
          ...data.flatMap(processItemToParagraph),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Documento.docx";
  document.body.appendChild(link);
  link.click();
  link.remove();
};
