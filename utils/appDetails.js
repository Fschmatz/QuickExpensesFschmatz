const AppDetails = {
  appVersion: "1.1.2",
  appName: "Quick Expenses Fschmatz",
  appNameHomePage: "Quick Expenses",
  repositoryLink: "https://github.com/Fschmatz/QuickExpensesFschmatz",
  backupFileName: "quick_expenses_backup",
};

AppDetails.changelog = `
${AppDetails.appVersion}
- Nova página de empréstimos
- Ícone monocromático

1.0.9
- Nova página de detalhes
- Total do mês atual no topo da página inicial 
- Gráfico na página de detalhes
- Alterado o projeto para o padrão expo
- Tecnicamente usável
- Nova página de detalhes do mês
- Correções
- Atualizar tag

0.9.0
- Exportar backup
- Importar backup

0.8.1
- Detalhes do mês
- Deletar despesa
- Configurações organizadas
- ExpenseTag criada
- Correção criar tabelas 

0.7.9
- Ducks pattern
- Nova página para criar/editar tag
- Implementado styled-components
- Página com detalhes da despesa mensal
- Iniciada a implementação do Redux e Saga
- Salvar tag
- Excluir tag
- Lista de tags
- Seleção de tags ao adicionar despesa
- Não permitir salvar com valor zero
- Alterações na IU
- Correções de bugs
- Convertido valores para PT-BR

0.6.0
- Página de tags
- Alterações no banco de dados
- Alterações na IU
- Correções de bugs

0.5.0
- Alterações na IU
- Correções de bugs

0.4.0
- Despesas mensais
- Alterações na IU

0.3.0
- Banco de dados
- Salvar despesa simples
- Página de despesas

0.2.0
- Início
- Configurações
- Tags

0.1.0
- Início do projeto
`;

export default AppDetails;
