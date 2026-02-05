export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'AI/ML' | 'Web Dev' | 'Data Science' | 'Full Stack' | 'Research';
  tags: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
  highlights?: string[];
  architecture?: string; // Architecture diagram URL or description
  documentation?: string[]; // List of documentation points
}

export interface MediumArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  readingTime: string;
  tags: string[];
  thumbnail?: string;
  claps?: number;
}

export interface Skill {
  name: string;
  category: 'AI/ML' | 'Backend' | 'Frontend' | 'Tools' | 'Data';
  proficiency: number; // 0-100
  icon?: string;
}

// Add your projects here - just append to the array!
export const projects: Project[] = [
  {
    id: 'ai-code-review',
    title: 'AI Code Review Platform',
    description: 'Serverless multi-agent system for automated code review using AWS Step Functions',
    longDescription: 'Built serverless system orchestrating 3 AI agents (Security, Performance, Best Practices) via AWS Step Functions. Achieved 15-second PR analysis with 67% faster execution through parallel processing and 99%+ cost reduction. Engineered RAG pipeline with vector embeddings in DynamoDB for semantic code search.',
    category: 'AI/ML',
    tags: ['Multi-Agent', 'Serverless', 'RAG', 'Code Analysis'],
    techStack: ['Python', 'AWS Lambda', 'DynamoDB', 'Step Functions', 'Vector Embeddings', 'RAG', 'GitHub Webhooks'],
    image: '/projects/code-review.jpg',
    githubUrl: 'https://github.com/sanyaprem/ai-code-review-platform',
    featured: true,
    date: '2025-01',
    highlights: [
      'Orchestrated 3 specialized AI agents for comprehensive code analysis',
      '67% faster execution through parallel processing',
      '99%+ cost reduction at $0.0002 per review',
      'RAG pipeline with 1536-dimensional vector embeddings',
      'Cosine similarity matching with <100ms latency',
      '60% reduction in analysis scope through AST-based parsing'
    ],
    stats: {
      stars: 0,
    },
    architecture: `
    **System Architecture:**
    
    1. **API Gateway** → Receives GitHub webhook events
    2. **Lambda Orchestrator** → Triggers Step Functions workflow
    3. **Step Functions** → Coordinates 3 AI agents in parallel:
       - Security Agent (vulnerability detection)
       - Performance Agent (optimization suggestions)  
       - Best Practices Agent (code quality)
    4. **DynamoDB** → Stores vector embeddings + analysis history
    5. **RAG Pipeline** → Semantic search across codebase
    6. **Response Aggregator** → Combines agent outputs
    7. **GitHub API** → Posts review comments on PR
    
    **Data Flow:**
    PR Created → Webhook → Lambda → Step Functions → [3 Agents] → DynamoDB → Aggregate → GitHub Comment
    `,
    documentation: [
      '**Setup**: Install via `npm install` → Configure AWS credentials → Deploy with `cdk deploy`',
      '**Configuration**: Set GitHub webhook URL → Add repository access token → Configure DynamoDB table',
      '**Usage**: Push code → PR automatically reviewed → Comments posted within 15 seconds',
      '**Agents**: Each agent has specific prompts and focuses on different code aspects',
      '**RAG System**: Automatically indexes your codebase for semantic similarity matching',
      '**Cost**: Serverless = pay only for what you use (~$0.0002 per review)'
    ]
  },
  {
    id: 'questai',
    title: 'QuestAI - AI Interview Simulator',
    description: 'Full-stack AI-powered interview preparation platform with automated scoring',
    longDescription: 'Built full-stack application with FastAPI backend and Streamlit frontend facilitating 15+ mock interviews with automated scoring and feedback generation. Engineered multi-agent system using Microsoft AutoGen with 3 specialized agents for dynamic conversations achieving 90%+ relevance in follow-up questions.',
    category: 'AI/ML',
    tags: ['AutoGen', 'Multi-Agent', 'Interview Prep', 'RAG'],
    techStack: ['Python', 'FastAPI', 'Streamlit', 'Microsoft AutoGen', 'LangChain', 'PyPDF2', 'Docker'],
    image: '/projects/questai.jpg',
    liveUrl: 'https://questai-frontend-ir1a.onrender.com/',
    githubUrl: 'https://github.com/sanyaprem/QuestAI',
    featured: true,
    date: '2025-01',
    highlights: [
      'Facilitated 15+ mock interviews with automated feedback',
      'Multi-agent system with 3 specialized agents',
      '90%+ relevance in follow-up questions',
      'RAG-based resume parsing',
      'Real-time PDF report generation within 2 minutes'
    ],
    architecture: `
    **System Architecture:**
    
    1. **Streamlit Frontend** → User interface for interview sessions
    2. **FastAPI Backend** → Handles requests and agent orchestration
    3. **Microsoft AutoGen** → Coordinates 3 AI agents:
       - Interviewer Agent (asks questions)
       - Evaluator Agent (scores responses)
       - Context Agent (maintains conversation flow)
    4. **RAG System** → Parses resume with PyPDF2 → Vector embeddings
    5. **LangChain** → Question generation based on resume context
    6. **PDF Generator** → Creates detailed feedback report
    
    **Interview Flow:**
    Upload Resume → RAG Parse → Agent generates questions → User responds → Evaluator scores → Repeat → PDF report
    `,
    documentation: [
      '**Installation**: Clone repo → `pip install -r requirements.txt` → Set API keys in `.env`',
      '**Running Locally**: `python -m streamlit run frontend.py` for UI → FastAPI runs on port 8000',
      '**Upload Resume**: PDF format → System extracts skills and experience automatically',
      '**Interview Process**: Answer questions verbally or in text → AI generates follow-ups dynamically',
      '**Feedback**: Detailed PDF report with scores, suggestions, and improvement areas',
      '**Agents**: Interviewer (questions), Evaluator (scoring), Context (maintains coherence)'
    ]
  },
  // Add more projects here - it's that easy!
];

export const skills: Skill[] = [
  // Languages & Core
  { name: 'Python', category: 'Backend', proficiency: 95 },
  { name: 'JavaScript', category: 'Frontend', proficiency: 80 },
  { name: 'SQL', category: 'Data', proficiency: 90 },
  
  // AI/ML & GenAI
  { name: 'LangGraph', category: 'AI/ML', proficiency: 90 },
  { name: 'LangChain', category: 'AI/ML', proficiency: 90 },
  { name: 'Microsoft AutoGen', category: 'AI/ML', proficiency: 85 },
  { name: 'RAG & Vector Embeddings', category: 'AI/ML', proficiency: 90 },
  { name: 'OpenAI GPT-4', category: 'AI/ML', proficiency: 85 },
  { name: 'Claude AI', category: 'AI/ML', proficiency: 85 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 80 },
  { name: 'PyTorch', category: 'AI/ML', proficiency: 80 },
  { name: 'Scikit-learn', category: 'AI/ML', proficiency: 85 },
  
  // Backend & APIs
  { name: 'FastAPI', category: 'Backend', proficiency: 95 },
  { name: 'Flask', category: 'Backend', proficiency: 85 },
  { name: 'REST API', category: 'Backend', proficiency: 90 },
  { name: 'Microservices', category: 'Backend', proficiency: 85 },
  
  // Databases
  { name: 'PostgreSQL', category: 'Data', proficiency: 85 },
  { name: 'Oracle', category: 'Data', proficiency: 85 },
  { name: 'DynamoDB', category: 'Data', proficiency: 80 },
  { name: 'ChromaDB', category: 'Data', proficiency: 85 },
  { name: 'Redis', category: 'Data', proficiency: 75 },
  
  // Cloud & DevOps
  { name: 'AWS Lambda', category: 'Tools', proficiency: 90 },
  { name: 'AWS Step Functions', category: 'Tools', proficiency: 85 },
  { name: 'Azure', category: 'Tools', proficiency: 80 },
  { name: 'Docker', category: 'Tools', proficiency: 85 },
  { name: 'Git & CI/CD', category: 'Tools', proficiency: 85 },
  
  // Add more skills easily
];

// // Placeholder for Medium articles - can be fetched from RSS or API
// export const mediumArticles: MediumArticle[] = [
//   {
//     id: 'article-1',
//     title: 'Building Production-Ready AI Applications',
//     description: 'A comprehensive guide to deploying AI models in production environments',
//     url: 'https://medium.com/@sanyapb/dynamodb-partition-keys-finally-made-sense-thanks-to-a-simple-book-analogy-b0617fb11607',
//     publishedDate: '2024-01-15',
//     readingTime: '8 min read',
//     tags: ['AI', 'Production', 'MLOps'],
//   },
//   // Add more articles or fetch from Medium API
// ];
export const mediumArticles: MediumArticle[] = [];
// This is now fetched dynamically from Medium RSS