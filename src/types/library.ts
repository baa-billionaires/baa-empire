export type BookPublicationStatus = 
  | 'idea' 
  | 'outline' 
  | 'draft' 
  | 'in_review' 
  | 'ready_for_pub' 
  | 'published' 
  | 'archived';

export type BookCollection = 
  | 'Collection A: Autonomous Intelligence and AI Engineering'
  | 'Collection B: Digital Economy and Business'
  | 'Collection C: Advanced Technology and Society';

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  estimatedMinutes: number;
  wordCount: number;
  summary: string;
  content: string;
  keyTakeaways: string[];
  practicalExercises?: string[];
  codeSnippets?: { language: string; code: string; caption: string }[];
}

export interface BookFrontCover {
  title: string;
  subtitle?: string;
  authorName: string;
  authorAlias: string;
  contactNumber: string;
  edition: string;
  artworkUrl: string;
  badge?: string;
  accentColor?: string;
}

export interface BookBackCover {
  synopsis: string;
  learningOutcomes: string[];
  authorBio: string;
  authorName: string;
  authorAlias: string;
  contactNumber: string;
  isbn?: string;
  publisherName: string;
  qrUrl?: string;
  barcodeData?: string;
}

export interface CompanionCourseData {
  courseId: string;
  title: string;
  modulesCount: number;
  lessonsCount: number;
  certificationTitle: string;
  xpReward: number;
  baacoinReward: number;
  quizQuestionsCount: number;
}

export interface BAABook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  collection: BookCollection;
  categoryNumber: number; // 1 to 25
  authorName: string;
  authorAlias: string;
  contactNumber: string;
  description: string;
  priceUsd: number;
  priceBaacoin: number;
  pages: number;
  edition: string;
  publicationStatus: BookPublicationStatus;
  publicationDate: string;
  isbn?: string;
  baseL2Hash?: string;
  rating: number;
  reviewsCount: number;
  readersCount: number;
  isFlagship?: boolean;
  frontCover: BookFrontCover;
  backCover: BookBackCover;
  chapters: BookChapter[];
  companionCourse?: CompanionCourseData;
  audiobookDurationMinutes?: number;
  audiobookNarrator?: string;
  tags: string[];
  formats: ('reader' | 'epub' | 'pdf' | 'audio' | 'course')[];
}

export interface PublishingAgent {
  id: string;
  roleNumber: number;
  name: string;
  category: 'Strategic' | 'Editorial' | 'Design & Media' | 'Pedagogy' | 'Distribution & Analytics';
  description: string;
  systemPrompt: string;
  status: 'idle' | 'analyzing' | 'drafting' | 'reviewing' | 'completed';
  tasksCompleted: number;
  currentTask?: string;
}

export interface BatchGenerationConfig {
  batchSize: number;
  targetCategories: string[];
  selectedModel: 'Gemini 2.5 Flash' | 'Gemini 2.5 Pro' | 'AutoMode Neural Swarm';
  contentDepth: 'Executive Summary (5 Chapters)' | 'Complete Sovereign Edition (8-12 Chapters)' | 'Comprehensive Technical Monograph (15+ Chapters)';
  autoCreateCovers: boolean;
  autoCreateCompanionCourse: boolean;
  editorialReviewRequired: boolean;
}

export interface ReaderProgress {
  bookId: string;
  currentChapterId: string;
  scrollPercentage: number;
  completedChapterIds: string[];
  totalMinutesRead: number;
  streakDays: number;
  lastReadTimestamp: string;
  bookmarks: { chapterId: string; note: string; timestamp: string }[];
  baacoinEarned: number;
}
