export const FIXED_LESSONS: Record<string, string> = {
  // --- MÓDULO 1: FUNDAMENTOS ---
  'top_intro': `
## 1. O que é Data Science? 🧠

Imagine que você é um detetive. Só que em vez de procurar impressões digitais, você procura **padrões em dados**.
Data Science (Ciência de Dados) é o processo de usar computadores para descobrir segredos escondidos em números e textos para ajudar empresas a tomarem decisões melhores.

**O Pensamento por trás:**
Não adianta "achar" que o cliente gosta de azul. Precisamos olhar os dados de vendas e **provar** que o botão azul vende mais que o vermelho.

---

## 2. Aplicação no Mundo Real 💼

*   **Recomendação de Filmes:** Como a Netflix sabe que você vai gostar daquele filme de ação? (Análise de histórico).
*   **Previsão de Vendas:** Quanto estoque a loja precisa comprar para o Natal? (Estatística).

---

## 3. Prática Guiada: Seu Primeiro Insight 👨‍💻

Vamos usar o Python como nossa calculadora superpoderosa para descobrir o lucro de uma empresa.

\`\`\`python
# 1. Definindo os dados (Variáveis)
faturamento = 25000  # Quanto a empresa vendeu
custo_total = 12000  # Quanto ela gastou para produzir

# 2. Processamento (A Lógica)
lucro = faturamento - custo_total

# Calculando a margem (Quanto sobra de cada real vendido?)
margem_porcentagem = (lucro / faturamento) * 100

# 3. Saída (Mostrando o resultado)
print(f"O lucro final foi de R$ {lucro}")
print(f"A margem de lucro é de {margem_porcentagem:.1f}%")
\`\`\`

### 🔍 Entendendo o Código (Linha a Linha):
*   \`faturamento = 25000\`: Estamos criando uma "gaveta" na memória do computador chamada *faturamento* e guardando o número 25000 nela.
*   \`lucro = ...\`: O Python resolve a matemática (25000 - 12000) e guarda o resultado (13000) na variável *lucro*.
*   \`print(f"...")\`: A função \`print\` escreve na tela. O \`f\` antes das aspas permite colocar variáveis dentro do texto usando \`{}\`.
*   \`{margem_porcentagem:.1f}\`: O \`:.1f\` é um código especial de formatação que diz: "mostre apenas **1** casa decimal após o ponto" (Float).

---

## 4. Dica Essencial 💎

**Nomes importam!** Note que usei \`custo_total\` e não \`x\` ou \`c\`. Em Data Science, seu código deve ser lido como um livro. Se você voltar neste código daqui a 6 meses, vai entender exatamente o que ele faz.
  `,

  'top_stats_desc': `
## 1. Estatística Descritiva: O Resumo da Ópera 🧠

Se você tiver uma tabela com 1 milhão de linhas, você não consegue ler tudo. A Estatística Descritiva serve para **resumir** esses dados em poucos números que explicam o todo.

Os três mosqueteiros da estatística são:
1.  **Média:** A soma de tudo dividido pela quantidade (O valor "esperado").
2.  **Mediana:** O valor exato do meio (Ignora exageros).
3.  **Desvio Padrão:** O quanto os dados variam (São consistentes ou bagunçados?).

---

## 2. Aplicação no Mundo Real 💼

Imagine que você quer saber o salário de uma profissão.
*   Se a média é R$ 5.000, parece bom.
*   Mas se o desvio padrão for alto, significa que uns ganham R$ 1.000 e outros R$ 9.000.
*   A estatística te protege de ser enganado pela "média".

---

## 3. Prática Guiada: Analisando Notas de Alunos 👨‍💻

Vamos usar a biblioteca \`statistics\` do Python para não precisar fazer conta na mão.

\`\`\`python
import statistics

# Lista com notas de 5 alunos
notas_turma = [5.5, 8.0, 9.0, 4.5, 10.0]

# 1. Calculando a Média (Average)
media = statistics.mean(notas_turma)

# 2. Calculando a Mediana (O valor central)
mediana = statistics.median(notas_turma)

# 3. Calculando o Desvio Padrão (Variação)
desvio = statistics.stdev(notas_turma)

print(f"Média da turma: {media}")
print(f"Mediana (aluno do meio): {mediana}")
print(f"Variação (Desvio Padrão): {desvio:.2f}")
\`\`\`

### 🔍 Entendendo o Código:
*   \`import statistics\`: Estamos pegando uma caixa de ferramentas pronta do Python chamada "statistics". Não precisamos reinventar a roda.
*   \`[5.5, 8.0, ...]\`: Isso é uma **Lista**. Pense nela como uma coluna do Excel.
*   \`statistics.mean(lista)\`: A função \`mean\` soma todos os números e divide por 5 automaticamente.
*   \`statistics.stdev(lista)\`: Calcula o desvio padrão. Se der um número baixo, as notas são parecidas. Se der alto, a turma é muito desigual.

---

## 4. Interpretando o Resultado 📊

A média deu 7.4. Mas o desvio padrão (2.43) mostra que a turma é heterogênea: temos alunos excelentes (10.0) e alunos com dificuldade (4.5). Olhar só a média esconderia os alunos que precisam de ajuda!
  `,

  'top_prob': `
## 1. Probabilidade: Lidando com a Incerteza 🧠

Em Data Science, quase nunca temos 100% de certeza. Trabalhamos com **chances**.
Probabilidade é calcular a chance de algo acontecer, variando de 0 (Impossível) a 1 (Certeza Absoluta).

**O Pensamento:** Se jogarmos uma moeda honesta, esperamos 50% de cara. Mas se jogarmos 10 vezes, pode dar cara 7 vezes por puro acaso. Quanto mais dados temos, mais a realidade se aproxima da teoria.

---

## 2. Aplicação no Mundo Real 💼

*   **Seguros:** Qual a probabilidade de um carro ser roubado neste bairro? (Define o preço do seguro).
*   **Marketing:** Qual a probabilidade de um cliente clicar neste anúncio?

---

## 3. Prática Guiada: O Jogo de Dados 👨‍💻

Vamos simular o lançamento de um dado para provar a teoria na prática.

\`\`\`python
import random

# Vamos simular jogar um dado 20 vezes
resultados = []

print("Jogando o dado...")

for i in range(20):
    # Gera um número aleatório entre 1 e 6
    dado = random.randint(1, 6)
    resultados.append(dado)

# Quantas vezes saiu o número 6?
vezes_seis = resultados.count(6)

# Cálculo da probabilidade observada
probabilidade = vezes_seis / 20

print(f"Resultados: {resultados}")
print(f"O número 6 saiu {vezes_seis} vezes.")
print(f"Probabilidade na prática: {probabilidade:.2f} (ou {probabilidade*100}%)")
\`\`\`

### 🔍 Entendendo o Código:
*   \`import random\`: Importa o módulo que gera números aleatórios (Sorteios).
*   \`resultados = []\`: Cria uma lista vazia para guardarmos o histórico dos jogos.
*   \`for i in range(20)\`: Um **Loop**. Diz ao computador: "Repita o código abaixo 20 vezes".
*   \`random.randint(1, 6)\`: Sorteia um número inteiro entre 1 e 6.
*   \`resultados.append(dado)\`: Adiciona o número sorteado na nossa lista.
*   \`lista.count(6)\`: Conta quantas vezes o número 6 aparece na lista.

---

## 4. Dica de Mestre 💎

Na teoria, a chance do 6 é 16% (1/6). Rode o código várias vezes! Você verá que em algumas tentativas dá 0%, em outras 30%. Isso é a **aleatoriedade**. Para ter precisão em Data Science, precisamos de MUITOS dados (Big Data) para diluir essa sorte.
  `,

  // --- MÓDULO 2: PYTHON PARA DADOS (PROFESSIONAL LEVEL) ---
  'top_py_syntax': `
## 1. Pythonico: List Comprehensions e Estruturas Otimizadas 🧠

Em Data Science, loops \`for\` tradicionais são frequentemente lentos e verbosos.
Para dominar Python, você precisa entender **List Comprehensions**: uma sintaxe concisa para criar listas baseadas em outras listas. É a base para entender como processar dados em memória de forma eficiente.

Outro conceito chave é o **Desempacotamento (Unpacking)** e o uso de **Zips**, fundamentais ao lidar com iterações de dados pareados.

---

## 2. Aplicação no Mundo Real 💼

*   **Limpeza de Texto (NLP):** Converter uma lista de 1 milhão de comentários de clientes para minúsculas em uma única linha de código.
*   **Feature Engineering:** Criar uma nova coluna de dados aplicando uma transformação matemática complexa em cada linha.

---

## 3. Prática Guiada: Código Pythonico 👨‍💻

Vamos comparar a "Velha Guarda" com o "Python Moderno".

\`\`\`python
precos_brutos = [100, 250, 300, 50, 400]
taxa = 1.10 # 10% de imposto

# --- ABORDAGEM JÚNIOR (Loop For Clássico) ---
precos_finais_v1 = []
for p in precos_brutos:
    if p > 100: # Apenas itens caros
        precos_finais_v1.append(p * taxa)

# --- ABORDAGEM SÊNIOR (List Comprehension) ---
# Sintaxe: [expressao FOR item IN lista IF condicao]
precos_finais_v2 = [p * taxa for p in precos_brutos if p > 100]

print(f"Resultado V1: {precos_finais_v1}")
print(f"Resultado V2: {precos_finais_v2}")

# --- DESEMPACOTAMENTO & ZIP ---
produtos = ['Tenis', 'Camisa', 'Meia']
vendas = [50, 100, 200]

# Zip une as listas como um zíper. Enumerate dá o índice.
print("\\n--- Relatório ---")
for i, (prod, venda) in enumerate(zip(produtos, vendas)):
    print(f"Rank #{i+1}: {prod} vendeu {venda} unidades")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`[p * taxa for p in ...]\`: Cria uma nova lista aplicando a operação matemática instantaneamente. É mais rápido que o \`append\` repetido porque o Python otimiza a alocação de memória internamente.
*   \`zip(lista1, lista2)\`: Cria um iterador de tuplas \`(Tenis, 50), (Camisa, 100)\`. Evita ter que acessar índices manualmente como \`lista1[i]\`.
*   \`enumerate()\`: Gera pares \`(indice, valor)\` automaticamente.

---

## 4. Dica de Mestre: Eficiência de Memória 💎

List Comprehensions carregam a lista inteira na memória RAM. Se você estiver processando 100GB de dados, isso vai travar seu PC.
Nesses casos, usamos **Generators** (trocando os colchetes \`[]\` por parênteses \`()\`). Eles processam um item por vez sob demanda ("Lazy Evaluation").
  `,

  'top_numpy': `
## 1. NumPy: Broadcasting e Vetorização Avançada 🧠

Você já sabe que NumPy é rápido. Mas para ser um profissional, você precisa entender o **Broadcasting**.
Broadcasting é a regra que permite ao NumPy fazer contas entre arrays de formatos diferentes (ex: somar um vetor de tamanho 3 a uma matriz 3x3) sem criar cópias desnecessárias dos dados.

A **Vetorização** elimina loops explícitos. Se você está escrevendo um \`for\` para iterar sobre um array NumPy, você provavelmente está fazendo errado.

---

## 2. Aplicação no Mundo Real 💼

*   **Normalização de Dados (Z-Score):** Subtrair a média de *todas* as colunas de uma matriz e dividir pelo desvio padrão em uma única linha.
*   **Visão Computacional:** Aplicar filtros de cor (RGB) em imagens 4K.

---

## 3. Prática Guiada: Manipulação Matricial 👨‍💻

\`\`\`python
import numpy as np

# Matriz 3x3 (Imagine 3 alunos, 3 provas)
notas = np.array([
    [7.0, 8.0, 9.0], 
    [5.0, 6.0, 5.0],
    [3.0, 4.0, 2.0]
])

# Vetor de Pesos (Prova 1 vale 10%, Prova 2 vale 40%...)
pesos = np.array([0.1, 0.4, 0.5])

# --- BROADCASTING NA PRÁTICA ---
# Estamos multiplicando uma Matriz (3x3) por um Vetor (3).
# O NumPy "estica" o vetor pesos para todas as linhas automaticamente.
notas_ponderadas = notas * pesos

print("--- Notas Ponderadas (Matriz) ---")
print(notas_ponderadas)

# Somando as linhas (axis=1) para ter a nota final de cada aluno
notas_finais = notas_ponderadas.sum(axis=1)

# --- MÁSCARA BOOLEANA (Filtragem Avançada) ---
# Quem foi aprovado? (Nota > 5.0)
aprovados_mask = notas_finais > 5.0
alunos_aprovados = notas_finais[aprovados_mask]

print(f"\\nNotas Finais: {notas_finais}")
print(f"Máscara de Aprovados: {aprovados_mask}") # [True, True, False]
print(f"Notas dos Aprovados: {alunos_aprovados}")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`notas * pesos\`: Broadcasting. O vetor \`[0.1, 0.4, 0.5]\` foi aplicado linha por linha.
*   \`.sum(axis=1)\`: \`axis=0\` operaria nas colunas (vertical). \`axis=1\` opera nas linhas (horizontal). Errar o eixo é o erro mais comum em NumPy.
*   \`mask = array > X\`: Cria um array de booleanos. Usar esse array como índice (\`array[mask]\`) é a forma mais performática de filtrar dados numéricos.

---

## 4. Dica de Mestre: Tipagem de Dados 💎

O NumPy usa tipos C (int32, float64). Por padrão, ele usa \`float64\`. Se você tem um array gigante e precisa economizar RAM, você pode definir \`dtype='float32'\` na criação. Isso corta o uso de memória pela metade, muitas vezes sem perder precisão relevante.
  `,

  'top_pandas_intro': `
## 1. Pandas Deep Dive: Indexação e Estrutura 🧠

Para dominar Pandas, você deve parar de tratar DataFrames como "tabelas simples" e entender os eixos e índices.
A maior confusão de quem está começando (e até de intermediários) é a diferença entre **\`loc\`** e **\`iloc\`**.

*   **Series:** É um array 1D com rótulos (Index).
*   **DataFrame:** É um conjunto de Series que compartilham o mesmo Index.
*   **\`loc\`**: Busca por **RÓTULO** (o nome da linha/coluna).
*   **\`iloc\`**: Busca por **POSIÇÃO INTEIRA** (o índice numérico 0, 1, 2...).

---

## 2. Aplicação no Mundo Real 💼

*   **Séries Temporais:** Selecionar todas as vendas de "Jan/2023" a "Mar/2023" (usando \`loc\` com datas).
*   **Data Engineering:** Selecionar as primeiras 100 linhas e as últimas 2 colunas para validação de pipeline (usando \`iloc\`).

---

## 3. Prática Guiada: Loc vs Iloc e Tipos 👨‍💻

\`\`\`python
import pandas as pd

# Dataset com índice personalizado (IDs de usuário)
dados = {
    'Nome': ['Ana', 'Beto', 'Carla', 'Dani'],
    'Score': [85, 90, 78, 92],
    'Status': ['Ativo', 'Inativo', 'Ativo', 'Ativo']
}
# Definindo 'ID' como índice. Agora as linhas não são mais 0,1,2,3.
df = pd.DataFrame(dados, index=[101, 102, 103, 104])

print("--- DataFrame com Índice Customizado ---")
print(df)

# --- O GRANDE DUELO: LOC vs ILOC ---

# LOC: Busca pelo ID 102 (Beto)
# Sintaxe: [Linha, Coluna]
busca_loc = df.loc[102, 'Score'] 

# ILOC: Busca pela SEGUNDA linha (índice 1, que é o Beto) e PRIMEIRA coluna
busca_iloc = df.iloc[1, 0] # Linha 1, Coluna 0 ('Nome')

print(f"\\nUsando LOC (ID 102): {busca_loc}")
print(f"Usando ILOC (Posição 1): {busca_iloc}")

# --- ANALISANDO DTYPES E MEMÓRIA ---
# É vital saber se seus números são 'int64' ou 'object' (texto)
print("\\n--- Tipos de Dados ---")
print(df.dtypes)
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`df.loc[102]\`: Procura o rótulo "102" no índice. Se o índice fosse datas, seria \`df.loc['2023-01-01']\`.
*   \`df.iloc[1]\`: Ignora totalmente os rótulos. Pega puramente a linha número 1 (a segunda linha física da tabela).
*   \`dtypes\`: Mostra como o Pandas enxerga cada coluna. Colunas mistas ou strings viram \`object\`, que são lentas e gastam muita memória.

---

## 4. Dica de Mestre: Cópia vs Visualização 💎

Ao fatiar dados (\`df_novo = df[0:5]\`), o Pandas às vezes cria uma cópia e às vezes uma "view" (referência). Se você tentar modificar \`df_novo\`, pode receber o famoso **SettingWithCopyWarning**.
Para evitar dor de cabeça, se você quer um dataframe novo independente, use sempre explicitamente: \`df_novo = df[0:5].copy()\`.
  `,

  'top_pandas_manip': `
## 1. Manipulação Avançada: Agg, Merge e Apply 🧠

Sair do básico \`.mean()\` e entrar na engenharia de dados.
1.  **Agregação Múltipla (\`.agg\`):** Calcular média, máx e mínimo ao mesmo tempo em um agrupamento.
2.  **Joins (\`.merge\`):** O equivalente ao SQL JOIN. Cruzar tabelas diferentes através de uma chave comum.
3.  **Apply e Lambda:** Aplicar funções personalizadas linha a linha (quando as funções nativas não bastam).

---

## 2. Aplicação no Mundo Real 💼

*   **Enriquecimento de Dados:** Cruzar a tabela de "Vendas" com a tabela de "Cadastro de Clientes" usando o CPF para saber em qual estado venderam mais.
*   **Categorização:** Criar uma coluna "Faixa de Preço" (Alto/Baixo) baseada em lógica complexa de negócios.

---

## 3. Prática Guiada: Engenharia de Dados 👨‍💻

\`\`\`python
import pandas as pd

# Tabela de Vendas
vendas = pd.DataFrame({
    'id_vendedor': [1, 2, 1, 3, 2],
    'valor': [100, 200, 150, 300, 50]
})

# Tabela de Cadastro (Metas)
cadastro = pd.DataFrame({
    'id_vendedor': [1, 2, 3],
    'nome': ['Ana', 'Beto', 'Carla'],
    'meta': [200, 500, 300]
})

# 1. MERGE (Cruzamento)
# Unindo as tabelas pelo 'id_vendedor'
df_completo = pd.merge(vendas, cadastro, on='id_vendedor', how='left')

print("--- Tabela Cruzada (Merge) ---")
print(df_completo)

# 2. GROUPBY com AGG (Agregação Múltipla)
# Para cada vendedor, queremos: Total Vendido, Média de Venda e Quantidade
resumo = df_completo.groupby('nome')['valor'].agg(['sum', 'mean', 'count'])

print("\\n--- Performance Detalhada ---")
print(resumo)

# 3. APPLY com LAMBDA (Função personalizada)
# Criando coluna de % da meta atingida
# Lambda é uma função anônima: lambda x: (formula)
# axis=1 faz percorrer linha a linha
df_completo['%_meta'] = df_completo.apply(
    lambda row: (row['valor'] / row['meta']) * 100, axis=1
)

print("\\n--- Cálculo Customizado (Apply) ---")
print(df_completo[['nome', 'valor', 'meta', '%_meta']].head(3))
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`pd.merge(..., how='left')\`: Mantém todas as linhas da esquerda (Vendas) e traz informações da direita (Cadastro). Se não achar o vendedor, ficaria \`NaN\`.
*   \`.agg(['sum', 'mean'])\`: Cria múltiplas colunas de resultado para o mesmo grupo. Poderosíssimo para relatórios.
*   \`.apply(lambda row: ..., axis=1)\`: Permite acessar múltiplas colunas da mesma linha (\`row['valor']\` e \`row['meta']\`) para fazer contas que não são vetorizadas nativamente.

---

## 4. Dica de Mestre: Evite o Apply se puder! 💎

O \`.apply(axis=1)\` é flexível, mas é **lento** (funciona como um loop for interno).
Sempre tente usar operações vetorizadas primeiro.
*   Lento: \`df.apply(lambda row: row['A'] + row['B'], axis=1)\`
*   Rápido (Vetorizado): \`df['A'] + df['B']\`
Use apply apenas quando a lógica for condicional complexa (muitos if/else) que o NumPy não resolve direto.
  `,

  // --- MÓDULO 3: VISUALIZAÇÃO (PROFESSIONAL LEVEL) ---
  'top_matplotlib': `
## 1. Matplotlib: Orientação a Objetos (O jeito Pro) 🧠

Iniciantes usam \`plt.plot()\`. Profissionais usam \`fig, ax = plt.subplots()\`.
Por que? A abordagem Orientada a Objetos te dá controle total sobre cada elemento. Imagine que a \`Figure\` é a parede e o \`Axes\` é o quadro pendurado na parede. Você pode ter vários quadros (gráficos) na mesma parede.

---

## 2. Aplicação no Mundo Real 💼

*   **Dashboards Estáticos:** Gerar um relatório PDF com 4 gráficos diferentes na mesma página (Vendas, Churn, NPS, Lucro) alinhados perfeitamente.

---

## 3. Prática Guiada: Subplots e Controle Total 👨‍💻

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Dados
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Criando a estrutura (1 Figura, 2 Eixos lado a lado)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

# Gráfico 1 (Seno)
ax1.plot(x, y1, color='blue', label='Seno')
ax1.set_title("Onda Senoidal")
ax1.set_xlabel("Tempo (s)")
ax1.grid(True, alpha=0.3) # Grade suave
ax1.legend()

# Gráfico 2 (Cosseno)
ax2.plot(x, y2, color='red', linestyle='--', label='Cosseno')
ax2.set_title("Onda Cosseno")
ax2.axhline(0, color='black', linewidth=1) # Linha zero
ax2.legend()

# Ajuste fino automático
plt.tight_layout()
print("Dashboard gerado!")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`plt.subplots(1, 2)\`: Cria 1 linha com 2 colunas de gráficos. Retorna a figura e os "axes" (os gráficos individuais).
*   \`ax1.set_title\`: Note que não é \`plt.title\`. Estamos falando diretamente com o objeto \`ax1\`.
*   \`tight_layout()\`: Função mágica que impede que as legendas e títulos de um gráfico fiquem em cima do outro.

---

## 4. Dica de Mestre 💎

Nunca use "gráficos de pizza" (Pie Charts) em ambientes corporativos sérios. O cérebro humano é péssimo em comparar áreas angulares. Prefira sempre gráficos de barras.
  `,

  'top_seaborn': `
## 1. Seaborn: Visualização Estatística de Alto Nível 🧠

Enquanto o Matplotlib desenha linhas, o Seaborn desenha **distribuições estatísticas**.
Ele é vital para entender a "forma" dos seus dados. Profissionais usam o Seaborn para ver outliers e densidade de probabilidade.

---

## 2. Aplicação no Mundo Real 💼

*   **Análise de Risco de Crédito:** Comparar a distribuição de idade entre quem pagou e quem deu calote usando Boxplots ou Violinplots.

---

## 3. Prática Guiada: Boxplot e Violinplot 👨‍💻

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Dados fictícios de salários por cargo
dados = pd.DataFrame({
    'Cargo': ['Jr', 'Jr', 'Jr', 'Pleno', 'Pleno', 'Pleno', 'Senior', 'Senior'],
    'Salario': [2000, 2200, 4000, 5000, 5500, 5200, 10000, 12000],
    'Genero': ['M', 'F', 'M', 'F', 'M', 'F', 'M', 'F']
})

fig, ax = plt.subplots(figsize=(8, 6))

# Boxplot: Mostra mediana, quartis e outliers
sns.boxplot(data=dados, x='Cargo', y='Salario', hue='Genero', palette='pastel', ax=ax)

# Melhorando a estética
sns.despine(trim=True) # Remove as bordas superior e direita (estilo minimalista)
plt.title("Distribuição Salarial por Cargo e Gênero")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`boxplot\`: O retângulo central mostra onde estão 50% dos dados. A linha no meio é a mediana. Pontos fora dos "bigodes" são outliers (anomalias).
*   \`hue='Genero'\`: Quebra a análise automaticamente comparando M vs F lado a lado.
*   \`despine()\`: Remove as linhas da moldura do gráfico. Gráficos profissionais têm baixa "taxa de tinta-dados" (Data-Ink Ratio). Menos é mais.

---

## 4. Interpretando o Resultado 📊

Se o retângulo do "Pleno" for muito maior que o do "Jr", significa que a variação salarial é maior nesse cargo. Se houver pontinhos pretos acima do gráfico, são salários fora da curva (outliers) que podem distorcer a média.
  `,

  'top_eda': `
## 1. EDA Profissional: Automação e Foco 🧠

Análise Exploratória não é fazer 50 gráficos aleatórios. É testar hipóteses.
O fluxo profissional envolve:
1.  Verificação de nulos (\`isna\`).
2.  Análise de Distribuição (Histogramas).
3.  Correlação (Heatmaps).
4.  Pairplots (Relação par-a-par).

---

## 2. Aplicação no Mundo Real 💼

*   **Churn Prediction:** Antes de criar o modelo, descobrir que a variável "Fatura Digital" tem 90% de valores nulos e deve ser descartada.

---

## 3. Prática Guiada: Pairplot e Correlação 👨‍💻

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Dataset Iris (Clássico para estudo)
df = sns.load_dataset('iris')

# 1. PAIRPLOT: O "Canivete Suíço" da EDA
# Plota todas as variáveis numéricas contra todas
# hue='species' colore os pontos pela classe alvo
sns.pairplot(df, hue='species', corner=True) 
# corner=True remove os gráficos repetidos (triângulo superior)

# 2. HEATMAP DE CORRELAÇÃO
plt.figure(figsize=(8, 6))
# Seleciona apenas colunas numéricas para correlação
corr = df.select_dtypes(include='number').corr()

sns.heatmap(corr, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title("Matriz de Correlação")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`pairplot\`: Se você tem 4 colunas numéricas, ele cria 16 gráficos (4x4) mostrando como cada variável interage com a outra. É a forma mais rápida de achar padrões visuais.
*   \`corner=True\`: O gráfico (A vs B) é igual ao (B vs A) espelhado. Usar \`corner=True\` limpa a poluição visual.
*   \`select_dtypes\`: Em DataFrames reais com colunas de texto, \`.corr()\` vai quebrar se você não filtrar apenas números antes.

---

## 4. Dica de Mestre 💎

Cuidado com a **Falácia da Correlação**. O Heatmap pode mostrar correlação 0.99 entre "Vendas de Sorvete" e "Ataques de Tubarão". Eles não têm relação! Ambos sobem porque é Verão (variável oculta). EDA mostra correlação, não causa.
  `,

  // --- MÓDULO 4: MACHINE LEARNING (PROFESSIONAL LEVEL) ---
  'top_ml_intro': `
## 1. Machine Learning: O Conceito de Pipeline 🧠

O maior erro de iniciantes é tratar o pré-processamento (limpeza) separado do modelo.
Se você calcular a média para preencher nulos usando *todos* os dados, você cometeu **Data Leakage** (Vazamento). O modelo "viu" o futuro.

Profissionais usam **Pipelines**: Um tubo fechado onde entra o dado sujo e sai a predição. O Pipeline garante que tudo que é aprendido no Treino seja aplicado exatamente igual no Teste.

---

## 2. Aplicação no Mundo Real 💼

*   **Produção:** Quando você coloca o modelo no ar, ele precisa receber o JSON cru do cliente, tratar nulos, escalar e prever. O Pipeline faz tudo isso em uma chamada.

---

## 3. Prática Guiada: Scikit-Learn Pipeline 👨‍💻

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Dados fictícios com nulos (NaN)
X = np.array([[1, 2], [np.nan, 4], [5, 6], [7, 8], [9, 10]])
y = np.array([0, 0, 1, 1, 1])

# Divisão Treino/Teste (CRUCIAL)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- CONSTRUINDO O PIPELINE PROFISSIONAL ---
# Passo 1: Preencher nulos com a média
# Passo 2: Colocar na mesma escala (StandardScaler)
# Passo 3: O Modelo (Regressão Logística)
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

# Treinar o Pipeline (Ele aplica os passos em sequência)
pipeline.fit(X_train, y_train)

# Prever
y_pred = pipeline.predict(X_test)
print(f"Predição: {y_pred}")
print(f"Passos do pipeline: {pipeline.named_steps}")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`Pipeline([...])\`: Encadeia transformações. O output de um vira o input do próximo.
*   \`SimpleImputer\`: Nunca preencha nulos manualmente com Pandas se for usar ML. Use o Imputer dentro do pipeline para evitar vazamento.
*   \`StandardScaler\`: Modelos lineares (como Logística e SVM) falham se uma coluna varia de 0-1 e outra de 0-1000. O Scaler deixa tudo com média 0 e desvio 1.

---

## 4. Dica de Mestre 💎

Vazamento de dados (Data Leakage) é o erro #1 que faz um modelo ter 99% de acurácia no seu PC e 50% na vida real. Usar Pipelines é a vacina contra isso.
  `,

  'top_linear_reg': `
## 1. Regressão Linear: As Suposições (Assumptions) 🧠

Rodar \`model.fit\` é fácil. O difícil é saber se o modelo é válido.
Regressão Linear não é mágica, é estatística. Ela assume coisas sobre seus dados:
1.  **Linearidade:** A relação é uma reta?
2.  **Homocedasticidade:** O erro é constante ou varia?
3.  **Normalidade dos Resíduos:** Os erros seguem uma curva de sino?

Se você ignorar isso, suas previsões serão lixo.

---

## 2. Aplicação no Mundo Real 💼

*   **Econometria:** Tentar prever o PIB baseado em variáveis que crescem exponencialmente (Juros compostos) usando um modelo linear vai gerar erros gigantescos no longo prazo.

---

## 3. Prática Guiada: Analisando Resíduos 👨‍💻

\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt

# Dados (X) e Alvo (y)
X = np.random.rand(100, 1) * 10
y = 2.5 * X + np.random.randn(100, 1) * 2 # Relação linear + ruído

model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)

# --- ANÁLISE DE RESÍDUOS (O jeito Pro de validar) ---
residuos = y - y_pred

plt.figure(figsize=(12, 4))

# Gráfico 1: Real vs Previsto
plt.subplot(1, 2, 1)
plt.scatter(X, y, alpha=0.5)
plt.plot(X, y_pred, color='red')
plt.title("Modelo (Linha Vermelha)")

# Gráfico 2: Resíduos (O erro)
plt.subplot(1, 2, 2)
plt.scatter(y_pred, residuos, alpha=0.5)
plt.axhline(0, color='black', linestyle='--')
plt.title("Gráfico de Resíduos")
plt.xlabel("Valor Previsto")
plt.ylabel("Erro (Resíduo)")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`residuos = y - y_pred\`: O que o modelo errou.
*   \`Gráfico de Resíduos\`: Se os pontos formarem um "padrão" (ex: uma curva ou um funil), seu modelo linear é RUIM, mesmo que o R² seja alto. Os pontos devem estar aleatoriamente espalhados ao redor da linha zero.

---

## 4. Interpretando o Resultado 📊

Se o gráfico de resíduos parecer uma "nuvem sem forma", parabéns, seu modelo capturou todo o sinal e sobrou apenas ruído aleatório. Se formar um "U", você precisa de um modelo polinomial, não linear.
  `,

  'top_classif': `
## 1. Classificação: Lidando com Desbalanceamento 🧠

No mundo real, as classes nunca são 50/50.
Em detecção de fraude, você tem 99.9% de transações legítimas e 0.1% de fraude.
Se você usar a métrica **Acurácia**, o modelo vai chutar "Legítimo" para tudo e acertar 99.9%. Parece ótimo, mas é inútil, pois não pegou nenhuma fraude.

Você precisa de:
1.  **Métricas Corretas:** Precision, Recall, F1-Score.
2.  **Estratégias:** Class Weights ou SMOTE (Synthetic Minority Over-sampling).

---

## 2. Aplicação no Mundo Real 💼

*   **Diagnóstico Médico:** É melhor errar dizendo que a pessoa saudável está doente (Falso Positivo) do que mandar uma pessoa doente para casa (Falso Negativo). Aqui maximizamos o **Recall**.

---

## 3. Prática Guiada: Classification Report e Class Weights 👨‍💻

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
import numpy as np

# Gerando dados desbalanceados (90% classe 0, 10% classe 1)
X = np.random.rand(1000, 5)
y = np.zeros(1000)
y[:100] = 1 # Apenas 100 casos positivos
np.random.shuffle(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# --- O TRUQUE: class_weight='balanced' ---
# O modelo penaliza mais o erro na classe minoritária
model = LogisticRegression(class_weight='balanced') 
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("--- Relatório Profissional ---")
# O classification_report mostra Precision/Recall por classe
print(classification_report(y_test, y_pred))

print("--- Matriz de Confusão ---")
print(confusion_matrix(y_test, y_pred))
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`class_weight='balanced'\`: Diz ao modelo: "Preste atenção na classe pequena!". Ele ajusta a matemática interna para dar mais peso aos erros da classe 1.
*   \`Recall (Revocação)\`: De todos que ERAM fraude, quantos eu peguei?
*   \`Precision\`: De todos que eu FALEI que era fraude, quantos realmente eram?

---

## 4. Dica de Mestre 💎

Em problemas de negócio, sempre pergunte: "O que custa mais caro? O Falso Positivo ou o Falso Negativo?". A resposta define se você vai otimizar Precision ou Recall. Não existe modelo perfeito.
  `,

  'top_model_eval': `
## 1. Validação Cruzada (Cross-Validation) 🧠

Dividir em Treino/Teste apenas uma vez é perigoso ("Sort of chance"). Talvez você tenha dado sorte e o Teste ficou com dados fáceis.
O padrão ouro é a **K-Fold Cross-Validation**.
O modelo treina e testa K vezes (ex: 5 vezes), rotacionando os dados. A média dessas 5 notas é a performance real do modelo.

---

## 2. Aplicação no Mundo Real 💼

*   **Competições Kaggle:** Quem confia só no teste local costuma cair no ranking público. Cross-Validation é a única forma de confiar no resultado.

---

## 3. Prática Guiada: K-Fold e ROC-AUC 👨‍💻

\`\`\`python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Dados sintéticos
X, y = make_classification(n_samples=1000, n_features=20)

model = RandomForestClassifier()

# --- CROSS-VALIDATION ---
# cv=5: Divide em 5 partes. Treina em 4, testa em 1. Repete 5x.
# scoring='roc_auc': Usando área sob a curva em vez de acurácia
scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')

print(f"Scores das 5 rodadas: {scores}")
print(f"Média ROC-AUC: {scores.mean():.3f} (+/- {scores.std():.3f})")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`cross_val_score\`: Automatiza todo o processo de loop, treino, teste e avaliação.
*   \`scoring='roc_auc'\`: Acurácia falha em desbalanceamento. ROC-AUC mede a capacidade de separação entre classes independente do corte de probabilidade. 0.5 é chute, 1.0 é perfeito.

---

## 4. Interpretando o Resultado 📊

Se a média for alta (0.90) mas o desvio padrão (\`std\`) for alto (0.10), seu modelo é **instável**. Ele funciona bem em alguns dados e mal em outros. Você precisa de mais dados ou de um modelo mais simples.
  `,

  // --- MÓDULO 5: DEEP LEARNING & PROD (PROFESSIONAL LEVEL) ---
  'top_nn_intro': `
## 1. Redes Neurais: Arquitetura e Overfitting 🧠

Deep Learning é poderoso, mas propenso a decorar dados (**Overfitting**).
Uma rede neural profissional precisa de mecanismos de defesa:
1.  **Dropout:** Desliga neurônios aleatoriamente durante o treino. Obriga a rede a aprender caminhos redundantes (robustez).
2.  **Early Stopping:** Para o treino assim que a rede começa a piorar na validação.

---

## 2. Aplicação no Mundo Real 💼

*   **Processamento de Imagem:** Redes convolucionais (CNNs) profundas usam Dropout massivo para não decorar as fotos de treino e conseguir reconhecer gatos em fotos novas.

---

## 3. Prática Guiada: Keras com Dropout e Callbacks 👨‍💻

\`\`\`python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

# Definindo a arquitetura
model = Sequential([
    Dense(64, activation='relu', input_shape=(10,)), # Camada Oculta 1
    Dropout(0.5), # Desliga 50% dos neurônios dessa camada a cada rodada
    Dense(32, activation='relu'), # Camada Oculta 2
    Dropout(0.3),
    Dense(1, activation='sigmoid') # Saída (Binária)
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# --- O GUARDIÃO: EARLY STOPPING ---
# patience=3: Se o erro de validação não cair por 3 épocas seguidas, PARA.
early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

# Simulando treino
# model.fit(X_train, y_train, validation_split=0.2, epochs=100, callbacks=[early_stop])

print("Arquitetura Robusta Criada:")
model.summary()
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`Dropout(0.5)\`: Evita que um neurônio confie demais na informação de um vizinho específico. Cria "independência" no aprendizado.
*   \`EarlyStopping\`: Evita o desperdício de tempo e o overfitting. Se a rede parou de aprender na época 20, não treine até a 100.
*   \`restore_best_weights=True\`: Garante que, ao parar, o modelo volte para o estado onde teve o melhor resultado, e não o último (que pode estar pior).

---

## 4. Dica de Mestre 💎

Deep Learning sem GPU é lento. Deep Learning sem dados é inútil. Deep Learning sem regularização (Dropout/EarlyStopping) é perigoso. Use com moderação.
  `,

  'top_tensorflow': `
## 1. TensorFlow vs PyTorch: O Ecossistema 🧠

No mercado, você encontrará ambos.
*   **TensorFlow/Keras:** Mais focado em produção e deployment (TFX, TF Serving). Padrão em muitas empresas grandes (Google, Uber).
*   **PyTorch:** Mais focado em pesquisa e flexibilidade. Padrão na academia e modelos generativos (como Stable Diffusion).

Como Data Scientist Pro, você aprende os conceitos, não a sintaxe. A lógica de tensores, gradientes e backpropagation é a mesma.

---

## 2. Aplicação no Mundo Real 💼

*   **Transfer Learning:** Em vez de treinar uma rede do zero (que leva semanas), baixamos uma rede pronta (ex: ResNet50 treinada no ImageNet) e treinamos apenas a última camada para reconhecer nossos produtos específicos.

---

## 3. Prática Guiada: Conceito de Tensores 👨‍💻

\`\`\`python
import numpy as np
import tensorflow as tf

# Criando um Tensor (Matriz multidimensional que roda na GPU)
tensor_a = tf.constant([[1.0, 2.0], [3.0, 4.0]])
tensor_b = tf.constant([[5.0, 0.0], [0.0, 6.0]])

# Multiplicação Matricial na GPU
resultado = tf.matmul(tensor_a, tensor_b)

print("Tensor Resultado:")
print(resultado)

# Convertendo de volta para NumPy (para usar com Scikit-Learn ou Pandas)
array_numpy = resultado.numpy()
print(f"\\nVolta pro NumPy: {array_numpy}")
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`tf.constant\`: Cria um tensor imutável.
*   \`tf.matmul\`: Multiplicação de matrizes altamente otimizada (C++ por baixo dos panos).
*   \`.numpy()\`: A ponte entre o mundo de Deep Learning e o mundo clássico do Python.

---

## 4. Dica de Mestre 💎

Não tente reinventar a roda. Se for trabalhar com texto (NLP) ou Imagem, comece sempre procurando um modelo pré-treinado no **Hugging Face** ou **TensorFlow Hub**. Otimizar um modelo pronto é 100x mais rápido que criar um do zero.
  `,

  'top_deployment': `
## 1. Deployment: O Modelo vira Produto (API) 🧠

O modelo no seu Jupyter Notebook não gera valor.
Para integrar com o aplicativo da empresa, você precisa encapsular o modelo em uma **API REST**.
O padrão moderno de mercado é usar **FastAPI** com **Docker**.

O fluxo é:
1.  Salvar o modelo treinado em arquivo (\`.pkl\` ou \`.h5\`).
2.  Criar um script API que carrega esse arquivo na memória ao iniciar.
3.  Receber requisições POST, prever e devolver JSON.

---

## 2. Aplicação no Mundo Real 💼

*   **Microsserviços:** Um contêiner Docker rodando apenas o modelo de Fraude, escalando horizontalmente (criando cópias) na Black Friday quando o tráfego aumenta.

---

## 3. Prática Guiada: Estrutura FastAPI (Conceitual) 👨‍💻

\`\`\`python
# --- ARQUIVO: main.py (Simulação) ---
# Em um projeto real, você rodaria: uvicorn main:app --reload

from pydantic import BaseModel
import pickle

# 1. Definindo o contrato de dados (O que a API aceita?)
# Pydantic garante que se mandarem texto no lugar de numero, dá erro.
class InputCliente(BaseModel):
    renda: float
    idade: int
    divida: float

# 2. Carregando o Modelo (Só uma vez, na inicialização!)
print("Carregando modelo...")
# model = pickle.load(open('meu_modelo.pkl', 'rb'))

# Simulação de função de previsão
def predict_dummy(dados):
    return 1 if dados.renda > 5000 else 0

# 3. Criando a Rota (Endpoint)
# @app.post("/prever")
def prever_risco(cliente: InputCliente):
    # O FastAPI converte o JSON para o objeto 'cliente' automaticamente
    risco = predict_dummy(cliente)
    
    return {
        "cliente_id": "anônimo",
        "aprovado": bool(risco),
        "probabilidade": 0.85 # Simulado
    }

# Testando a lógica
input_teste = InputCliente(renda=7000.0, idade=30, divida=0.0)
print(prever_risco(input_teste))
\`\`\`

### 🔍 Entendendo as Ferramentas:
*   \`Pydantic (BaseModel)\`: Validação de dados automática. Vital para APIs robustas. Evita que seu modelo quebre com dados sujos vindos do front-end.
*   \`Carregar fora da função\`: O modelo deve ser carregado no escopo global. Se você carregar o modelo *dentro* da função \`prever\`, a API vai demorar segundos para responder cada chamada (latência alta) e estourar a memória.

---

## 4. Dica de Mestre 💎

**Dockerize tudo.** "Na minha máquina funciona" não é aceito em ambientes profissionais. Crie um \`Dockerfile\` que instala o Python, as bibliotecas e copia seu código. Isso garante que roda igual na nuvem da AWS, Azure ou Google.
  `
};
