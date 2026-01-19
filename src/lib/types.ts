export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Application-level types
export interface UserProfile {
  id: string;
  fullName: string;
  dob: string; // ISO Date
  phone: string;
  email: string;
  links: { linkedin?: string; portfolio?: string };
  languages: Array<{ language: string; level: string }>;
  certifications: Array<{ name: string; authority: string; year: string }>;
}

export interface WorkExperience {
  id?: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  duties: string;
  achievements: string; // "I increased X by Y%"
}

export interface Education {
  id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id?: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Tool';
  level: number;
}

// Union type for the AI Context Source
export type ResumeContext = 
  | { type: 'manual'; data: { profile: UserProfile; work: WorkExperience[]; edu: Education[]; skills: Skill[] } }
  | { type: 'document'; text: string };

export interface GeneratedResume {
  id: string;
  userId: string;
  targetJobDescription: string;
  tailoredJson: {
    profile: UserProfile;
    experience: WorkExperience[];
    education: Education[];
    skills: Skill[];
    summary: string;
  };
  createdAt: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          date_of_birth: string | null
          phone: string | null
          email: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          summary_bio: string | null
          languages: Json | null
          certifications: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          email?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          summary_bio?: string | null
          languages?: Json | null
          certifications?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          email?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          summary_bio?: string | null
          languages?: Json | null
          certifications?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      work_experiences: {
        Row: {
          id: string
          user_id: string
          company: string
          job_title: string
          location: string | null
          start_date: string
          end_date: string | null
          is_current: boolean
          duties: string | null
          achievements: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company: string
          job_title: string
          location?: string | null
          start_date: string
          end_date?: string | null
          is_current?: boolean
          duties?: string | null
          achievements?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company?: string
          job_title?: string
          location?: string | null
          start_date?: string
          end_date?: string | null
          is_current?: boolean
          duties?: string | null
          achievements?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      educations: {
        Row: {
          id: string
          user_id: string
          institution: string
          degree: string
          field_of_study: string | null
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          institution: string
          degree: string
          field_of_study?: string | null
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          institution?: string
          degree?: string
          field_of_study?: string | null
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          name: string
          category: 'Hard' | 'Soft' | 'Tool'
          proficiency: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: 'Hard' | 'Soft' | 'Tool'
          proficiency: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: 'Hard' | 'Soft' | 'Tool'
          proficiency?: number
          created_at?: string
          updated_at?: string
        }
      }
      uploaded_documents: {
        Row: {
          id: string
          user_id: string
          file_url: string
          parsed_text: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          parsed_text?: string | null
          uploaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          parsed_text?: string | null
          uploaded_at?: string
        }
      }
      generated_resumes: {
        Row: {
          id: string
          user_id: string
          target_job_description: string
          tailored_json: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_job_description: string
          tailored_json: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_job_description?: string
          tailored_json?: Json
          created_at?: string
        }
      }
    }
  }
}

// Additional type definitions for application use
export interface Language {
  language: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface ManualIngestPayload {
  profile: {
    full_name?: string;
    date_of_birth?: string;
    phone?: string;
    email?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    summary_bio?: string;
    languages?: Language[];
    certifications?: Certification[];
  };
  work_experiences?: Array<{
    company: string;
    job_title: string;
    location?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    duties?: string;
    achievements?: string;
  }>;
  educations?: Array<{
    institution: string;
    degree: string;
    field_of_study?: string;
    start_date: string;
    end_date?: string;
  }>;
  skills?: Array<{
    name: string;
    category: 'Hard' | 'Soft' | 'Tool';
    proficiency: number;
  }>;
}
