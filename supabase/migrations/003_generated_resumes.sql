-- Generated Resumes Table
CREATE TABLE generated_resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_job_description TEXT NOT NULL,
    tailored_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for better query performance
CREATE INDEX idx_generated_resumes_user_id ON generated_resumes(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE generated_resumes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Generated Resumes
CREATE POLICY "Users can view own generated resumes"
    ON generated_resumes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated resumes"
    ON generated_resumes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generated resumes"
    ON generated_resumes FOR DELETE
    USING (auth.uid() = user_id);
