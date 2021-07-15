import { SiteClient } from datocms-client;

export default async function recebedorDeRequests(request, response){

    if(request.method === 'POST'){
 
        const TOKEN = '37d84ef7fc069fbd4c069471dbc7b2';
        const client = new SiteClient(TOKEN);

        //IMPORTANTE: Validar os dados antes de fazer o cadastro
        const registroCriado = await client.items.create({// ID já é criado pelo dato
            itemTyme: '966836',
            ...request.body,
            /*title: "Teste de criação comunidade",
            imageUrl: "https://github.com/ivinib.png",
            creatorSlug: "ivinb"*/
        })

        response.json({
            dados: 'Algum dado',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "GET não tem nada para retornar"
    })
}