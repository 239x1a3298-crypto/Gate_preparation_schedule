import type { SyllabusTopic } from '../types';

export const GATE_DA_SYLLABUS: SyllabusTopic[] = [
    {
        id: 'prob-stats',
        subject: 'Probability and Statistics',
        name: 'Probability & Statistics',
        completed: false,
        subtopics: [
            'Counting (Permutations and Combinations)',
            'Probability Axioms',
            'Sample Space, Events',
            'Independent Events',
            'Mutually Exclusive Events',
            'Marginal, Conditional and Joint Probability',
            'Bayes Theorem',
            'Conditional Expectation and Variance',
            'Mean, Median, Mode and Standard Deviation',
            'Correlation and Covariance',
            'Random Variables',
            'Discrete/Continuous Distributions',
            'Uniform, Normal, Exponential, Poisson, Binomial, Bernoulli',
            'Law of Large Numbers',
            'Central Limit Theorem',
            'Simple Linear Regression'
        ]
    },
    {
        id: 'linear-algebra',
        subject: 'Linear Algebra',
        name: 'Linear Algebra',
        completed: false,
        subtopics: [
            'Vector Spaces',
            'Subspaces',
            'Linear Dependence and Independence',
            'Matrices',
            'Projection Matrix',
            'Orthogonal Matrix',
            'Idempotent Matrix',
            'Partition Matrices',
            'Systems of Linear Equations',
            'Eigenvalues and Eigenvectors',
            'Singular Value Decomposition (SVD)'
        ]
    },
    {
        id: 'calculus',
        subject: 'Calculus',
        name: 'Calculus',
        completed: false,
        subtopics: [
            'Limits',
            'Continuity',
            'Differentiability',
            'Maxima and Minima',
            'Mean Value Theorem',
            'Integration'
        ]
    },
    {
        id: 'dsa',
        subject: 'Programming, Data Structures and Algorithms',
        name: 'Programming & DSA',
        completed: false,
        subtopics: [
            'Python Programming',
            'Stacks and Queues',
            'Linked Lists',
            'Trees (BST, AVL, etc.)',
            'Graphs (BFS, DFS)',
            'Hashing',
            'Sorting and Searching Algorithms'
        ]
    },
    {
        id: 'dbms',
        subject: 'Database Management and Warehousing',
        name: 'DBMS',
        completed: false,
        subtopics: [
            'ER-models',
            'Relational Model (Relational Algebra, Tuple Calculus)',
            'SQL Queries',
            'Integrity Constraint',
            'Normalization (1NF, 2NF, 3NF, BCNF)',
            'File Organization',
            'Indexing',
            'Data Warehousing'
        ]
    },
    {
        id: 'ml',
        subject: 'Machine Learning',
        name: 'Machine Learning',
        completed: false,
        subtopics: [
            'Supervised Learning (Regression, Classification)',
            'Unsupervised Learning (Clustering, PCA)',
            'Logistic Regression',
            'k-NN',
            'SVM',
            'Decision Trees',
            'Random Forest',
            'Neural Networks (MLP, Feedforward)',
            'Dimensionality Reduction'
        ]
    },
    {
        id: 'ai',
        subject: 'Artificial Intelligence',
        name: 'Artificial Intelligence',
        completed: false,
        subtopics: [
            'Search Strategies (BFS, DFS, A*)',
            'Logic (First-order Logic, Propositional Logic)',
            'Reasoning'
        ]
    }
];
