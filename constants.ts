import { Module } from './types';

export const CURRICULUM: Module[] = [
  {
    id: 'mod_foundation',
    title: 'Módulo 1: Fundamentos de Data Science',
    description: 'Matemática básica, estatística descritiva e lógica de programação.',
    level: 'Beginner',
    topics: [
      { id: 'top_intro', title: 'O que é Data Science?', description: 'Visão geral, papéis e responsabilidades.', completed: false },
      { id: 'top_stats_desc', title: 'Estatística Descritiva', description: 'Média, mediana, moda, desvio padrão.', completed: false },
      { id: 'top_prob', title: 'Probabilidade Básica', description: 'Conceitos fundamentais e distribuições.', completed: false },
    ]
  },
  {
    id: 'mod_python',
    title: 'Módulo 2: Python para Dados',
    description: 'Dominando a linguagem mais usada no mercado.',
    level: 'Beginner',
    topics: [
      { id: 'top_py_syntax', title: 'Sintaxe Python & Estruturas de Dados', description: 'Listas, Dicionários, Tuplas e Sets.', completed: false },
      { id: 'top_numpy', title: 'Computação Numérica com NumPy', description: 'Arrays, vetores e operações matriciais.', completed: false },
      { id: 'top_pandas_intro', title: 'Introdução ao Pandas', description: 'DataFrames, Series e leitura de arquivos.', completed: false },
      { id: 'top_pandas_manip', title: 'Manipulação de Dados', description: 'Filtragem, limpeza e agregação.', completed: false },
    ]
  },
  {
    id: 'mod_viz',
    title: 'Módulo 3: Visualização de Dados',
    description: 'Contando histórias com dados.',
    level: 'Intermediate',
    topics: [
      { id: 'top_matplotlib', title: 'Matplotlib Essentials', description: 'Gráficos básicos e personalização.', completed: false },
      { id: 'top_seaborn', title: 'Seaborn para Estatística', description: 'Visualizações estatísticas atraentes.', completed: false },
      { id: 'top_eda', title: 'Análise Exploratória (EDA)', description: 'Metodologia completa de EDA.', completed: false },
    ]
  },
  {
    id: 'mod_ml',
    title: 'Módulo 4: Machine Learning',
    description: 'Modelos preditivos e algoritmos.',
    level: 'Intermediate',
    topics: [
      { id: 'top_ml_intro', title: 'Conceitos de ML', description: 'Supervisionado vs Não Supervisionado.', completed: false },
      { id: 'top_linear_reg', title: 'Regressão Linear', description: 'Teoria e implementação com Scikit-Learn.', completed: false },
      { id: 'top_classif', title: 'Classificação', description: 'Regressão Logística, KNN e Árvores.', completed: false },
      { id: 'top_model_eval', title: 'Avaliação de Modelos', description: 'Métricas, Cross-Validation e Overfitting.', completed: false },
    ]
  },
  {
    id: 'mod_adv',
    title: 'Módulo 5: Deep Learning & Produção',
    description: 'Redes neurais e deploy de modelos.',
    level: 'Advanced',
    topics: [
      { id: 'top_nn_intro', title: 'Redes Neurais Artificiais', description: 'Perceptron e Backpropagation.', completed: false },
      { id: 'top_tensorflow', title: 'TensorFlow & Keras', description: 'Construindo sua primeira rede neural.', completed: false },
      { id: 'top_deployment', title: 'Model Deployment', description: 'APIs com Flask/FastAPI e Docker.', completed: false },
    ]
  }
];
