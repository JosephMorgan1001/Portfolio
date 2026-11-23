import { GoogleGenAI } from "@google/genai";
import { FIXED_LESSONS } from "../data/fixedLessons";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLessonContent = async (topicTitle: string, moduleTitle: string, topicId: string): Promise<string> => {
  // 1. Check if we have manually curated content for this topic
  if (FIXED_LESSONS[topicId]) {
    return FIXED_LESSONS[topicId];
  }

  // 2. Fallback to Generative AI
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Atue como um Professor Sênior de Data Science altamente didático e detalhista.
      
      Tópico da aula: "${topicTitle}"
      Módulo atual: "${moduleTitle}"
      
      **OBJETIVO CRÍTICO:**
      O aluno reclamou que aulas anteriores mostravam código sem explicar as funções.
      Sua missão é criar uma aula onde **CADA** função, método ou parâmetro novo seja explicado. O aluno precisa entender a "anatomia" do código.
      
      **ESTRUTURA OBRIGATÓRIA DA AULA (Markdown):**
      
      ## 1. Conceito e Teoria 🧠
      Explique o tema de forma clara e acessível (Use analogias).
      
      ## 2. Aplicação no Mundo Real 💼
      Onde isso é usado em uma empresa de verdade? (Ex: Previsão de estoque, Análise de churn).
      
      ## 3. Prática Guiada (Código Explicado) 👨‍💻
      
      Apresente o código Python de forma estruturada.
      
      **IMPORTANTE: LOGO APÓS O CÓDIGO, CRIE UMA SEÇÃO "ENTENDENDO AS FERRAMENTAS":**
      Nesta seção, liste e explique cada função e parâmetro usado no código acima.
      
      *Exemplo de formato esperado:*
      > **Entendendo o Código:**
      > * \`pd.DataFrame(dados)\`: Função do Pandas que transforma nosso dicionário em uma tabela estruturada (linhas e colunas).
      > * \`df['coluna'].mean()\`: Calcula a média aritmética dos valores daquela coluna.
      > * \`plt.figure(figsize=(10, 5))\`: Cria a área do gráfico. O parâmetro \`figsize\` define o tamanho (10 de largura, 5 de altura).
      > * \`marker='o'\`: Coloca uma bolinha em cada ponto do gráfico para destacar os dados.
      > * \`linestyle='--'\`: Define que a linha do gráfico será tracejada.
      
      ## 4. Interpretando o Resultado 📊
      Ensine o aluno a ler o output. O que o número ou gráfico diz sobre o negócio?
      
      ## 5. Dica de Mestre 💎
      Uma boa prática de mercado (PEP8), otimização ou erro comum para evitar.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Erro ao gerar conteúdo. Tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao conectar com o tutor de IA. Verifique sua chave API.";
  }
};

export const generateExercise = async (topicTitle: string, lessonContent: string): Promise<{ question: string, starterCode: string }> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Crie um exercício prático de programação em Python baseado EXCLUSIVAMENTE no conteúdo da aula abaixo.
      
      >>> CONTEÚDO DA AULA:
      ${lessonContent}
      
      >>> TAREFA:
      Gere um desafio que obrigue o aluno a praticar as funções e conceitos ensinados no texto acima.
      Se o texto ensinou 'statistics.mean', o exercício DEVE pedir para usar 'statistics.mean'.
      
      Retorne APENAS um objeto JSON com o seguinte formato, sem markdown extra:
      {
        "question": "Descrição detalhada do desafio. Cite explicitamente quais funções da aula devem ser usadas.",
        "starterCode": "# Seu código começa aqui\n# Importe as bibliotecas necessárias\n"
      }
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { question: "Erro ao gerar exercício.", starterCode: "" };
  }
};

export const reviewCode = async (topicTitle: string, userCode: string, exerciseDescription: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Atue como um Corretor de Código Sênior ("Code Reviewer") rigoroso e honesto.
      
      Contexto: O aluno está fazendo um exercício sobre "${topicTitle}".
      
      >>> ENUNCIADO DO DESAFIO (REQUISITOS):
      "${exerciseDescription}"
      
      >>> CÓDIGO ENTREGUE PELO ALUNO:
      \`\`\`python
      ${userCode}
      \`\`\`
      
      SUA TAREFA:
      Avalie se o aluno cumpriu TODOS os requisitos técnicos solicitados no enunciado.
      Não aceite "gambiarras" se o enunciado pediu uma biblioteca específica.
      
      RETORNE A RESPOSTA NESTE FORMATO EXATO (Markdown):
      
      # Nota: [0 a 10]/10
      
      ## Checklist de Requisitos ✅
      - [ ] Requisito 1 (ex: Usou statistics.mean): (Sim/Não)
      - [ ] Requisito 2 (ex: Lógica correta): (Sim/Não)
      
      ## Feedback Honesto 📝
      (Seja direto. Se o código não roda ou ignora o enunciado, diga. Se estiver perfeito, elogie).
      
      ## Crítica Técnica e Melhorias 🚀
      (Analise o método utilizado. Exemplo: "Você usou um loop for para calcular média, mas pediu-se para usar a biblioteca statistics. Isso é ineficiente em Python..." ou "Bom uso de list comprehension".)
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Não foi possível avaliar o código no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao avaliar código.";
  }
};

export const startFeynmanCheck = async (topicTitle: string, lessonContent: string): Promise<string> => {
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `
            Baseado no seguinte conteúdo sobre "${topicTitle}":
            "${lessonContent.substring(0, 3000)}..."

            Gere UMA única pergunta conceitual profunda (não pergunte sintaxe).
            A pergunta deve forçar o aluno a explicar o "Porquê" ou "Como" algo funciona, simulando a Técnica Feynman.
            
            Exemplo ruim: "Qual comando calcula a média?"
            Exemplo bom: "Explique com suas palavras por que o Desvio Padrão é mais confiável que a Média para entender uma turma desigual."

            Retorne apenas a pergunta.
        `;
        const response = await ai.models.generateContent({ model, contents: prompt });
        return response.text || "Explique o conceito principal desta aula com suas palavras.";
    } catch (e) {
        return "Resuma o conceito principal desta aula.";
    }
}

export const validateFeynmanCheck = async (question: string, userAnswer: string): Promise<{score: number, feedback: string}> => {
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `
            Você é um professor avaliando a compreensão de um aluno.
            
            Pergunta Feita: "${question}"
            Resposta do Aluno: "${userAnswer}"

            Avalie a resposta usando a Técnica Feynman: O aluno explicou de forma simples e correta? Ele entendeu a essência?
            
            Retorne JSON:
            {
                "score": (0 a 10),
                "feedback": "Texto curto explicando onde ele acertou ou errou. Se errou, explique o conceito corretamente de forma breve."
            }
        `;
        const response = await ai.models.generateContent({ 
            model, 
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return JSON.parse(response.text || '{"score": 0, "feedback": "Erro."}');
    } catch (e) {
        return { score: 0, feedback: "Erro ao validar." };
    }
}


export const generateReviewCard = async (topic: string): Promise<{ concept: string, analogy: string, example: string }> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Crie um "Flashcard de Revisão" didático sobre o tópico: "${topic}".
      
      O objetivo é refrescar a memória do aluno de forma simples e breve.
      
      Retorne JSON puro com 3 campos:
      1. concept: Uma explicação de 1 ou 2 frases sobre O QUE É isso.
      2. analogy: Uma analogia do mundo real (ex: "Uma variável é como uma caixa..."). Comece com "Imagine que..."
      3. example: Um exemplo curto de código ou caso de uso prático.
      
      JSON Formato:
      {
        "concept": "...",
        "analogy": "Imagine que...",
        "example": "..."
      }
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating card", error);
    return { concept: "Erro ao carregar", analogy: "", example: "" };
  }
};

export const generateReviewQuestion = async (topics: string[]): Promise<{ question: string, options: string[], answer: number, explanation: string }> => {
  try {
    // Note: The caller should filter topics appropriately. Here we pick one from the list provided.
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const model = 'gemini-3-flash-preview';
    
    const prompt = `
      Crie uma questão de múltipla escolha conceitual sobre: "${topic}".
      
      Retorne JSON puro:
      {
        "question": "Pergunta...",
        "options": ["A", "B", "C", "D"],
        "answer": 0,
        "explanation": "Explique a resposta detalhando o conceito ou função envolvida."
      }
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
        question: "Erro ao gerar revisão.", 
        options: ["Erro", "Erro", "Erro", "Erro"], 
        answer: 0, 
        explanation: "Tente novamente." 
    };
  }
};

export const chatWithTutor = async (history: {role: 'user'|'model', text: string}[], message: string, context?: string): Promise<string> => {
    try {
        const model = 'gemini-3-flash-preview';
        let systemInstruction = "Você é um mentor de Data Science focado em didática. Ao responder perguntas sobre código, SEMPRE explique para que serve cada função e parâmetro mencionado. Não assuma que o usuário sabe a sintaxe. Seja detalhista mas prático.";
        
        if (context) {
            systemInstruction += `\n\nCONTEXTO ATUAL (O aluno está estudando o seguinte material agora): \n>>> INICIO CONTEXTO \n${context}\n<<< FIM CONTEXTO\n\nResponda às perguntas do aluno levando em conta este contexto. Se ele perguntar "o que isso faz", refira-se ao código no contexto.`;
        }

        const chat = ai.chats.create({
            model,
            history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
            config: {
                systemInstruction
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text || "Sem resposta.";
    } catch (error) {
        console.error("Chat Error", error);
        return "Erro no chat.";
    }
}