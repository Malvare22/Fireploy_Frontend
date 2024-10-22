export interface SubjectType {
  name: string;
  code: number;
  group: string;
  students: StudentType[];
  sections: SectionType[];
}

export interface ProjectType {
  name: string;
  students: StudentType[];
}

export interface StudentType {
  name: string;
  code: number;
}

export interface SectionType {
  name: string;
  projects: ProjectType[];
}
