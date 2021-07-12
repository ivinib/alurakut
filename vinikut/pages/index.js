import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/VinikutCommons';
import { ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades){
  
  console.log(propriedades);

  return(   
    <Box>
      <img  src={`https://github.com/${propriedades.githubUser}.png`}  style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {

  const usuarioAleatorio = "ivinib";
  const pessoasFavoritas = [
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib',
    'ivinib'    
  ]

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

            <OrkutNostalgicIconSet />
          </h1>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return(
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
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
