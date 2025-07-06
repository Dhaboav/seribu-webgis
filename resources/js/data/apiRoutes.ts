import { ApiRoute } from '@/types/api';

export const apiRoutes: ApiRoute[] = [
    {
        method: 'POST',
        uri: '/api/image',
        description: 'Upload an image file.',
        example: `POST /api/image
Headers:
    Authorization: Bearer {api_token}
    Content-Type: multipart/form-data

Body:
    file: (image file)`,

        response: `{
    "user"   : "Username",
    "message": "Image uploaded successfully.",
    "path"   : "/storage/uploads/gemastik.jpg"
}`,
    },
    {
        method: 'DELETE',
        uri: '/api/image',
        description: 'Delete an uploaded image.',
        example: `DELETE /api/image
Headers:
    Authorization: Bearer {api_token}
    Content-Type: application/json

Body:
{
    "path": "/storage/uploads/gemastik.jpg"
}`,
        response: `{
    "message": "Image deleted successfully."
}`,
    },
];
