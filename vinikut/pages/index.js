import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/VinikutCommons';
import { ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades){
  
  console.log(propriedades);

  return(   
    <Box as="aside">
      <img  src={`https://github.com/${propriedades.githubUser}.png`}  style={{ borderRadius: '8px' }}/>
      <hr />

      <p>
        <a className="boxLink" href="https://github.com/${propriedades.githubUser}.png">
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        Seguidores ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
          return(
            <li key={itemAtual.id}>
              <img src={itemAtual.avatar_url} />
              <span>{itemAtual.login}</span>
            </li>
          )
        })}
      {/*seguidores.map((itemAtual) => {
          return(
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
          </li>
          )
        })*/}          
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const usuarioAleatorio = 'ivinib';
  const [comunidades, setComunidades] = React.useState([{
    id: '52486526845645',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const pessoasFavoritas = [
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib'    
  ]

  const [seguidores, setSeguidores] = React.useState([])

React.useEffect(function(){
    fetch('https://api.github.com/users/ivinib/followers')
    .then(function(respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
   })
}, [])

  return( 
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas  = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
              
            }}>
            <div>

                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
                type="text"
                />
              </div>

              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}> 

      <ProfileRelationsBox title="seguidores" items={seguidores} />
        
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return(
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}            
          </ul>
      </ProfileRelationsBoxWrapper>

      <ProfileRelationsBoxWrapper>
         <h2 className="smallTitle">
           Pessoas({pessoasFavoritas.length})
         </h2>
         <ul>
           {pessoasFavoritas.map((itemAtual) => {
             return(
               <li key={itemAtual}>
                 <a href={`/users/${itemAtual}`}>
                   <img src={`https://github.com/${itemAtual}.png`} />
                   <span>{itemAtual}</span>
                 </a>
               </li>
             )
           })}            
        </ul>
           
       </ProfileRelationsBoxWrapper>        
      </div>
    </MainGrid>
    </>
  );
}

