// track the searches made by a user
import { Client, Databases, ID, Query } from 'appwrite';
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)

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
                    movie_title: movie?.title || '',
                    poster_url: movie?.poster_path || ''
                }
            );
        }
    } catch (error) {
        console.error('Error updating search count:', error);
    }
};
