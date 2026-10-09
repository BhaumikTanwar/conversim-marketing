

export interface SectorFAQItem {
  question: string;
  answer: string;
}

export interface SectorUseCaseItem {
  icon: string;
  title: string;
  copy: string;
}

export interface SectorCta {
  label: string;
  onClick: () => void;
}

export interface UseCase {
  icon: string;
  title: string;
  description: string;
  detail?: string;
  className: string;
}
