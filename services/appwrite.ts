// track the searches made by a user
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PLATFORM_ID = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ID;

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

if (PLATFORM_ID) {
    client.setPlatform(PLATFORM_ID);
} else {
    console.warn('Missing EXPO_PUBLIC_APPWRITE_PLATFORM_ID environment variable. Appwrite requests may fail on native platforms.');
}

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: any) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', query)]
        );

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                doc.$id, 
                { count: (doc.count || 0) + 1 }
            );
        } else {
            await database.createDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                ID.unique(), 
                { 
                    searchTerm: query, 
                    count: 1, 
                    movie_id: movie?.id || '', 
                    title: movie?.title || '',
                    poster_url: movie?.poster_path || ''
                }
            );
        }
    } catch (error) {
        console.error('Error updating search count:', error);
    }
};

export const pingAppwrite = async () => {
    try {
        const url = new URL('/health', client.config.endpoint);
        const res = await client.call('GET', url);
        console.log('✅ Appwrite connection healthy:', res);
        return true;
    } catch (error) {
        console.error('❌ Appwrite health check failed:', error);
        return false;
    }
};
