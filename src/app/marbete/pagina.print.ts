import { Marbete } from "../interfaces/marbete.interface";

export const paginaMarbete = (marbete: Marbete): any[] => {

    
    let formatNumber = Intl.NumberFormat('en-US');

    if (marbete.tipoMarbete == "MATERIA PRIMA") {
        marbete.componente = marbete.sku
    }


    return [
        {
            text: `${marbete.instruccionesImpresion || ''}`,
            alignment: 'center',
            fontSize: 16
        },
        {
            columns: [
                {
                    margin: [0, 50, 0, 0],
                    style: 'label',
                    width: 150,
                    text: `ID: ${marbete.id_oportunidad}`,
                },                
            ],
        },        
        {

            columns: [
                {
                    style: 'label',
                    width: 150,
                    text: 'Descripción:',
                },
                {
                    style: 'valor',
                    width: "*",

                    text: `${marbete.descripcion}`,
                },
            ],
        },
        {
            columns: [
                {
                    style: 'label',
                    width: 150,
                    text: 'Cliente:',
                },
                {
                    style: 'valor',
                    width: "*",

                    text: `${marbete.responsable}`,
                },
            ],
        },                      
        {
            columns: [
                {
                    text: `Cantidad:`, width: "20%", fontSize: 30, margin: [0, 100, 0, 0]
                },
                { text: `${formatNumber.format(marbete.inventario)} `, width: "60%", alignment: 'left', fontSize: 120, characterSpacing: -10, margin: [0, 50, 0, 0] },
                {
                    text: `Unidad:${marbete.unidad || 'PZ'}`, width: "20%", fontSize: 30, margin: [0, 150, 0, 0], alignment: 'right'
                },

            ],
        },
        
        {
            text: marbete.identificador,
            alignment: 'center',
            style: 'palletID',
            margin: [-40, -10, 0, 0],
        },
        {
            qr: marbete.id_oportunidad,
            fit: '200',
            alignment: 'center',
            margin: [0, -450, -300, 0],
        },




    ];
};