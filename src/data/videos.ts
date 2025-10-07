export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  completed: boolean;
}

export interface Category {
  id: string;
  title: string;
  videos: Video[];
}

export const categories: Category[] = [
  {
    id: 'ia',
    title: 'Inteligência Artificial',
    videos: [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Introdução à Inteligência Artificial - Conceitos Fundamentais',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        duration: '15:22',
        views: '12K visualizações',
        completed: false
      },
      {
        id: 'jNQXAC9IVRw',
        title: 'Como a IA está Transformando o Mundo Digital',
        thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg',
        duration: '22:18',
        views: '8.5K visualizações',
        completed: false
      },
      {
        id: 'M7lc1UVf-VE',
        title: 'Machine Learning para Iniciantes - Tutorial Completo',
        thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg',
        duration: '35:45',
        views: '15.3K visualizações',
        completed: false
      },
      {
        id: 'aircAruvnKk',
        title: 'Redes Neurais Artificiais - Como Funcionam na Prática',
        thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg',
        duration: '18:33',
        views: '9.7K visualizações',
        completed: false
      }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    videos: [
      {
        id: '8pDqJVdNa4Y',
        title: 'Estratégias de Marketing Digital para 2024',
        thumbnail: 'https://i.ytimg.com/vi/8pDqJVdNa4Y/hqdefault.jpg',
        duration: '28:15',
        views: '22K visualizações',
        completed: false
      },
      {
        id: 'b1xx9CzVaDE',
        title: 'Como Criar uma Estratégia de Inbound Marketing Eficaz',
        thumbnail: 'https://i.ytimg.com/vi/b1xx9CzVaDE/hqdefault.jpg',
        duration: '19:42',
        views: '14.7K visualizações',
        completed: false
      },
      {
        id: '0FxWS7OiF7Y',
        title: 'Marketing de Conteúdo: Do Planejamento à Execução',
        thumbnail: 'https://i.ytimg.com/vi/0FxWS7OiF7Y/hqdefault.jpg',
        duration: '32:10',
        views: '18.2K visualizações',
        completed: false
      }
    ]
  },
  {
    id: 'financas',
    title: 'Mercado Financeiro',
    videos: [
      {
        id: '4ZUkA3iMhXU',
        title: 'Fundamentos do Mercado Financeiro para Iniciantes',
        thumbnail: 'https://i.ytimg.com/vi/4ZUkA3iMhXU/hqdefault.jpg',
        duration: '25:30',
        views: '31K visualizações',
        completed: false
      },
      {
        id: 'CQJy45q9540',
        title: 'Análise Técnica: Como Ler Gráficos e Tendências',
        thumbnail: 'https://i.ytimg.com/vi/CQJy45q9540/hqdefault.jpg',
        duration: '42:15',
        views: '19.8K visualizações',
        completed: false
      },
      {
        id: 'b1xx9CzVaDE',
        title: 'Investimentos em Ações: Estratégias para Iniciantes',
        thumbnail: 'https://i.ytimg.com/vi/b1xx9CzVaDE/hqdefault.jpg',
        duration: '38:22',
        views: '27.4K visualizações',
        completed: false
      }
    ]
  }
];