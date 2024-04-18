import { Marbete } from "../interfaces/marbete.interface";
import { paginaMarbete } from "./pagina.print";

export const cuerpoMarbete = (marbete:Marbete) => {    
     const content = paginaMarbete(marbete);    
    
    const header = (i:string) => {
        
        return [
            {
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: `${marbete.tipoMarbete.toUpperCase()}`,
                                characterSpacing: 6,
                                fillColor: 'black',
                                color: 'white',
                                border: [true, true, true, true],
                                height: '50',
                                margin: [2, 5, 2, 2],
                                alignment: 'center',
                                bold: true,
                                fontSize: 24,
                            },
                        ],
                    ],
                },
            },
        ];
    };
    const footer = (currentPage:string, pageCount:string) => {
        return [
            {
                columns: [
                    {
                        text: `${marbete.codigoFormato}`,
                        alignment: 'left',
                        margin: [20, 0, 50, 0],
                    },
                    // {
                    //     text: `Palet ${currentPage} de ${pageCount}`,
                    //     alignment: 'right',
                    //     margin: [0, 0, 50, 0],
                    // },
                ],
            },
        ];
    };

    const doc = {   
        pageOrientation: 'landscape',        
        header,
        content,
        styles: stylesMarbete,
        footer,
        
    };

    return doc;
};

 const stylesMarbete = {
    label: {
        margin: [0, 10, 0, 0],
        fontSize: 16,
        bold: true,
    },
    skuLabel: {
        fontSize: 16,

    },
    valor: {
        margin: [0, 10, 0, 0],
        fontSize: 14,
    },
    descripcionPalet: {
        margin: [10, 10, 0, 15],
    },
    tipoTarima: {
        fontSize: 14,
    },
    header: {
        fontSize: 70,

        bold: true,
    },
    palletID: {
        fontSize: 160,
        characterSpacing: -10,
        fontFeatures: ['smcp'],
    },
    piezasTxt: {
        fontSize: 100,
        characterSpacing: -10,
        fontFeatures: ['smcp'],
    },
    sub_header: {
        fontSize: 30,
    },
}