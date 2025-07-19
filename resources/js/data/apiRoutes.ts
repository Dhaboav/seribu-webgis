import { ApiRoute } from '@/types/api';

export const apiRoutes: ApiRoute[] = [
    {
        method: 'POST',
        uri: '{URL}/api/upload-data',
        description: 'Upload a data from sensor.',
        example: `POST /api/upload-data
Headers:
    Authorization: Bearer {api_token}
    Content-Type: multipart/form-data

Body:
    user_id: {id akun},
    loc_id: {id lokasi},
    is_trash: 1,
    water_lvl: 0.90
    file: (image file)`,

        response: `{
    "message": "Data added successfully",
}`,
    },
    {
        method: 'DELETE',
        uri: '{URL}/api/delete-data',
        description: 'Delete a data information.',
        example: `DELETE /api/delete-data
Headers:
    Authorization: Bearer {api_token}
    Content-Type: application/json

Body:
{
    "data_id": "{id}"
}`,
        response: `{
    "message": "Data deleted successfully"
}`,
    },
];
