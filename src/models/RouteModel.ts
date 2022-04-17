import { FC } from "react";

export interface Route {
  key: string;
  /* Título da página */
  title: string;
  /* Caminho da rota */
  path: string;
  /* Componente a ser renderizado */
  component: FC<{}>;
  /* Regra para ativar ou não o redirecionamento da rota */
  enabled?: boolean;
  /* Responsável por mostrar ou não o botão no header */
  showHeaderBtn?: boolean;
}
