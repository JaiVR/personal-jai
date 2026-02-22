import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client
// We use the SERVICE_ROLE_KEY to bypass Row Level Security (RLS) policies 
// for admin actions (adding/deleting).
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, url, password } = body;

        // 1. Verify Password
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Validate Input
        if (!title || !url) {
            return NextResponse.json({ error: 'Missing title or url' }, { status: 400 });
        }

        // 3. Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('reads')
            .insert([{ title, url }])
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error adding read:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id, password } = body;

        // 1. Verify Password
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Delete from Supabase
        const { error } = await supabaseAdmin
            .from('reads')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting read:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
