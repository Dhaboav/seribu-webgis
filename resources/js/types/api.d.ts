export interface ApiRoute {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    uri: string;
    description: string;
    example: string;
    response: string;
}
