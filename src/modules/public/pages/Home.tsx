import { Box, Button, Container } from "@mui/material";
import { ReactElement } from "react";
import "../styles/Home.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import logoPequena from "../../../assets/logoPequena.png";
import meio from "../../../assets/meio.png";
import vaca3 from "../../../assets/vaca3.png";
import vaca2 from "../../../assets/vaca2.png";
import logoInicial from "../../../assets/logoInicial.png";
import estacio from "../../../assets/estacio.png";
import beatriz from "../../../assets/beatriz.png";
import laranjeira from "../../../assets/laranjeira.png";
import leticia from "../../../assets/leticia.png";
import george from "../../../assets/george.png";
import footer from "../../../assets/footer.png";
import pablo from "../../../assets/pablo.png";
import { Link } from "react-router-dom";

const HomePage = (): ReactElement => {
  return (
    <>
      <header>
        <div id="img-logoPequena">
          <img src={logoPequena} alt="Erro..." />
        </div>

        <div id="cabecalho">
          <Box>
            <Button
              sx={{ color: "black", fontSize: "20px" }}
              id="btn-header"
              href="#Home"
            >
              Home
            </Button>
            <Button
              sx={{ color: "black", fontSize: "20px" }}
              id="btn-header"
              href="#projeto"
            >
              Projeto
            </Button>
            <Button
              sx={{ color: "black", fontSize: "20px" }}
              id="btn-header"
              href="#inst"
            >
              Instituição
            </Button>
            <Button
              sx={{ color: "black", fontSize: "20px" }}
              id="btn-header"
              href="#sobre_Nos"
            >
              Sobre
            </Button>
          </Box>
        </div>

        <div id="credenciais">
          <Button sx={{ fontSize: "20px" }}>
            <Link id="btn-header" to="/sign-up">
              Cadastrar
            </Link>
          </Button>
          <Button sx={{ left: "20px", fontSize: "20px" }}>
            <Link id="btn-header" to="/sign-in">
              Login
            </Link>
          </Button>
        </div>
      </header>

      <div id="imgMeio">
        <img src={meio} alt="Erro..." />
      </div>
      <div id="imgMeio1">
        <img src={vaca3} alt="Erro..." />
      </div>
      <div id="imgMeio2">
        <img src={vaca2} alt="Erro..." />
      </div>

      <main>
        <Container>
          <section id="home">
            <div id="logo">
              <img id="img-logo" src={logoInicial} alt="" />
            </div>

            <div id="agroRural">
              <h1>O que é o AGRO RURAL?</h1>

              <span>
                O sistema que veio para trazer mais praticidade e facilidade a
                vida do produtor rural, ajudando com o gerenciamento do seu
                gado.
                <br /> O AgroRural foca na gestão e no controle de vacinação do
                gado onde o pecuarista possa cadastrar seus animais podendo
                assim ter uma visão ampla de seu rebanho, e tendo acesso aos
                relatórios que o próprio sistema fornece, além de também ser
                notificado quando o animal estiver no período de vacinação.
              </span>
            </div>

            <section id="projeto">
              <div id="ideia">
                <h1>Como Surgiu a Ideia?</h1>

                <span>
                  A ideia surgiu no momento que foi visto a dificuldade que os
                  pecuaristas possui em relação ao controle do seu gado, um dos
                  principais fatores é a perda dos dados dos animais que muita
                  das vezes acaba ocasionando vários prejuízos como por exemplo
                  não saber a data que o bezerro nasceu. Com o controle do
                  nascimento o produtor rural consegue saber o momento exato de
                  quando vacinar o animal, fazendo com que não perca a data de
                  vacinação.
                </span>
              </div>
            </section>
            <div id="objetivo">
              <h1>Nosso Objetivo</h1>

              <span>
                O AgroRural tem como objetivo fazer com que o pecuarista consiga
                ter uma visão ampla e melhor controle do seu rebanho, sendo
                também notificado quando o animal estiver no período exato de
                vacinação.
              </span>
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "2%",
                  }}
                >
                  <div id="teste">
                    <CheckOutlinedIcon sx={{ color: "green", margin: "2%" }} />
                    <p>Controle do rebanho.</p>
                  </div>
                  <div id="teste">
                    <CheckOutlinedIcon sx={{ color: "green", margin: "2%" }} />
                    <p>Notificar o período de vacinação de cada animal.</p>
                  </div>
                  <div id="teste">
                    <CheckOutlinedIcon sx={{ color: "green", margin: "2%" }} />
                    <p>
                      Gerar a declaração do rebanho facilitando quando o
                      pecuarista for declarar o gado no órgão de fiscalização
                      agropecuário.
                    </p>
                  </div>
                  <div id="teste">
                    <CheckOutlinedIcon sx={{ color: "green", margin: "2%" }} />
                    <p>Gerar Relatórios da quantidade de animais.</p>
                  </div>
                  <div id="teste">
                    <CheckOutlinedIcon sx={{ color: "green", margin: "2%" }} />
                    <p>
                      Visão ampla do negócio facilitando com a tomada de
                      decisão.
                    </p>
                  </div>
                </Box>
              </div>
            </div>
          </section>

          <section id="inst">
            <div id="instituicao">
              <h1>Instituição</h1>
              <div className="conjunto">
                <span>
                  Universidade Estácio de Sá (UNESA). Universidade privada
                  brasileira fundada em 1970, no bairro de Rio Comprido, Foi
                  fundada como uma Faculdade de Direito e hoje possui mais de 39
                  Campos universitários espalhados pelo Brasil com diversos
                  Cursos; Nesse projeto (AgroRural), o projeto ficará Alocado no
                  Campos de Cabo Frio{" "}
                </span>
                <div id="img-instituicao">
                  <img src={estacio} alt="Erro..." />
                </div>
              </div>
            </div>
          </section>

          <section id="sobre_Nos">
            <h1>Orientador</h1>
            <div id="orientador">
              <h2>Alessandro Laranjeiras</h2>

              <div>
                <img id="img-sobreOrientador" src={laranjeira} alt="Erro..." />
              </div>

              <span id="sobreOrientador">
                Professor de Ensino Superior e Técnico | Arquiteto de Sistemas |
                Analista de Sistemas
                <br />
                Bacharel em Sistemas de Informação e tecnólogo em Sistemas
                Móveis Celulares (Telecomunicações),
                <br />
                pela Universidade Estácio de Sá, e especialista em Arquitetura
                de Software Distribuído,
                <br />
                pela Pontifícia Universidade Católica de Minas Gerais – PUC
                Minas.
              </span>
            </div>

            <div id="sobreNos">
              <h1>Sobre nós</h1>
              <div id="sobre-nos">
                <div className="sobre">
                  <div>
                    <img className="img-sobre" src={beatriz} alt="Erro..." />
                  </div>
                  <h2>Beatriz Ferrete</h2>
                  <span>
                    Estudante de Sistemas de Informação pela instituição Estácio
                    de Sá. Responsável pela documentação do sistema AgroRural.
                  </span>
                </div>

                <div className="sobre">
                  <div>
                    <img className="img-sobre" src={george} alt="Erro..." />
                  </div>
                  <h2>Georger Michael</h2>
                  <span>
                    Estudante de Sistemas de Informação pela instituição Estácio
                    de Sá. Atua na área do back-end e banco de dados do sistema
                    AgroRural.
                  </span>
                </div>

                <div className="sobre">
                  <div>
                    <img className="img-sobre" src={leticia} alt="Erro..." />
                  </div>
                  <h2>Letícia Santana</h2>
                  <span>
                    Estudante de Sistemas de Informação pela instituição Estácio
                    de Sá. Atua na área do front-end do sistema AgroRural.
                  </span>
                </div>

                <div className="sobre">
                  <div>
                    <img className="img-sobre" src={pablo} alt="Erro..." />
                  </div>
                  <h2>Pablo Redig</h2>
                  <span>
                    Estudante de Sistemas de Informação pela instituição Estácio
                    de Sá. Atua na área do front-end do sistema AgroRural.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <footer>
        <section id="rodape">
          <div id="imgfooter">
            <img src={footer} alt="Erro..." />
          </div>
        </section>
      </footer>
    </>
  );
};

export default HomePage;
