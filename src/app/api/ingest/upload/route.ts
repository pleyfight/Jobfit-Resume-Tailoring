import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isConfigured = supabaseUrl && !supabaseUrl.includes('placeholder');

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF and DOCX files are allowed' },
        { status: 400 }
      );
    }

    // Demo mode: If Supabase is not configured, simulate successful upload
    if (!isConfigured) {
      console.log('Demo mode: Supabase not configured, simulating upload');
      return NextResponse.json({
        success: true,
        demo: true,
        document: {
          id: `demo-${Date.now()}`,
          fileName: file.name,
          fileUrl: `demo://uploads/${file.name}`,
          uploadedAt: new Date().toISOString()
        },
        message: 'Demo mode: File upload simulated. Configure Supabase for real uploads.'
      });
    }

    // Real upload with Supabase
    const { getServerSupabase } = await import('@/lib/supabase');
    const supabase = getServerSupabase();
    
    // For MVP: Use a demo user ID (in production, get from auth)
    const userId = '00000000-0000-0000-0000-000000000000';

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: `Failed to upload file: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    // For MVP, store placeholder text
    const extractedText = `[File uploaded: ${file.name}]`;

    // Save document metadata to database
    const { data: docData, error: dbError } = await supabase
      .from('uploaded_documents')
      .insert({
        user_id: userId,
        file_url: publicUrl,
        parsed_text: extractedText
      } as any)
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: `Failed to save document: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      document: {
        id: (docData as any).id,
        fileName: file.name,
        fileUrl: publicUrl,
        uploadedAt: (docData as any).uploaded_at
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
