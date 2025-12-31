import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';

// Mapping table names to schema objects
const tableMap: Record<string, any> = {
    // Auth
    users: schema.user,


    // Academic
    faculties: schema.faculties,
    studyPrograms: schema.studyPrograms,
    careerProspects: schema.careerProspects,
    academicCalendar: schema.academicCalendar,
    campusFacilities: schema.campusFacilities,


    // Admissions
    admissionPathways: schema.admissionPathways,
    admissionClasses: schema.admissionClasses,
    educationCosts: schema.educationCosts,
    scholarships: schema.scholarships,
    admissionRegistrations: schema.admissionRegistrations,
    admissionDocuments: schema.admissionDocuments,




    // Events
    eventCategories: schema.eventCategories,
    events: schema.events,


    // Galleries
    galleryCategories: schema.galleryCategories,
    galleryMedia: schema.galleryMedia,

    // News
    newsCategories: schema.newsCategories,
    news: schema.news,

    // Partnerships
    partners: schema.partners,
    partnershipDocuments: schema.partnershipDocuments,


    // Profiles
    universityProfiles: schema.universityProfiles,
    campusStatistics: schema.campusStatistics,
    universityAccreditations: schema.universityAccreditations,
    testimonials: schema.testimonials,
    rectorMessages: schema.rectorMessages,
    homepageStatistics: schema.homepageStatistics,
    heroSections: schema.heroSections,
    universityLogoMeanings: schema.universityLogoMeanings,

    contactInformation: schema.contactInformation,
    organizationalStructures: schema.organizationalStructures,
    organizationalEmployees: schema.organizationalEmployees,


    // Student Services
    studentServices: schema.studentServices,
    studentServiceContacts: schema.studentServiceContacts,
    studentOrganizations: schema.studentOrganizations,

    studentAchievements: schema.studentAchievements,
    universityAwards: schema.universityAwards,
    campusAccessibilities: schema.campusAccessibilities,
    socialMediaLinks: schema.socialMediaLinks,
};

// GET - Fetch all records from a table
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    try {
        const { table } = await params;
        const tableSchema = tableMap[table];

        if (!tableSchema) {
            return NextResponse.json(
                { error: 'Table not found' },
                { status: 404 }
            );
        }

        const data = await db.select().from(tableSchema);
        return NextResponse.json({ data, count: data.length });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}

// POST - Create a new record
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    try {
        const { table } = await params;
        const tableSchema = tableMap[table];

        if (!tableSchema) {
            return NextResponse.json(
                { error: 'Table not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { id: _i, createdAt: _c, updatedAt: _u, ...rawData } = body;

        // Get actual table columns to filter out invalid fields
        const columns = getTableColumns(tableSchema);
        const insertData: Record<string, any> = {};

        for (const [key, value] of Object.entries(rawData)) {
            if (key in columns && key !== 'id') {
                let finalValue = value;

                // Handle empty strings as null
                if (finalValue === '') {
                    finalValue = null;
                }

                // Convert date strings to Date objects
                const col = columns[key] as any;
                if (finalValue !== null && (col.dataType === 'date' || col.columnType?.includes('Timestamp'))) {
                    finalValue = new Date(finalValue as any);
                }

                insertData[key] = finalValue;
            }
        }

        // Auto-generate slug if title exists but slug doesn't
        if (!insertData.slug && insertData.title && 'slug' in columns) {
            insertData.slug = insertData.title
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
        }

        const result = (await db.insert(tableSchema).values(insertData).returning()) as any[];

        return NextResponse.json({ data: result[0], message: 'Record created successfully' });
    } catch (error: any) {
        console.error('Error creating record:', error);
        return NextResponse.json(
            { error: 'Failed to create record', details: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update a record
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    try {
        const { table } = await params;
        const tableSchema = tableMap[table];

        if (!tableSchema) {
            return NextResponse.json(
                { error: 'Table not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { id, createdAt: _c, updatedAt: _u, ...rawData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required for update' },
                { status: 400 }
            );
        }

        // Get actual table columns to filter out invalid fields
        const columns = getTableColumns(tableSchema);
        const updateData: Record<string, any> = {};

        for (const [key, value] of Object.entries(rawData)) {
            if (key in columns && key !== 'id') {
                let finalValue = value;

                // Handle empty strings as null
                if (finalValue === '') {
                    finalValue = null;
                }

                // Convert date strings to Date objects
                const col = columns[key] as any;
                if (finalValue !== null && (col.dataType === 'date' || col.columnType?.includes('Timestamp'))) {
                    finalValue = new Date(finalValue as any);
                }

                updateData[key] = finalValue;
            }
        }

        // Add updatedAt if the table has it
        if ('updatedAt' in columns) {
            updateData.updatedAt = new Date();
        }

        const result = (await db
            .update(tableSchema)
            .set(updateData)
            .where(eq(tableSchema.id, id))
            .returning()) as any[];

        if (result.length === 0) {
            return NextResponse.json(
                { error: 'Record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: result[0], message: 'Record updated successfully' });
    } catch (error: any) {
        console.error('Error updating record:', error);
        return NextResponse.json(
            { error: 'Failed to update record', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete a record
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    try {
        const { table } = await params;
        const tableSchema = tableMap[table];

        if (!tableSchema) {
            return NextResponse.json(
                { error: 'Table not found' },
                { status: 404 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required for deletion' },
                { status: 400 }
            );
        }

        const result = (await db
            .delete(tableSchema)
            .where(eq(tableSchema.id, id))
            .returning()) as any[];

        if (result.length === 0) {
            return NextResponse.json(
                { error: 'Record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting record:', error);
        return NextResponse.json(
            { error: 'Failed to delete record' },
            { status: 500 }
        );
    }
}
