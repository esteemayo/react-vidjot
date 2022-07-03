import http from './httpService';

const apiEndPoint = '/ideas';

const ideaUrl = (id) => `${apiEndPoint}/${id}`;

export const getIdeas = () => http.get(apiEndPoint);

export const getIdea = (id) => http.get(ideaUrl(id));

export const createIdea = (idea) => http.post(apiEndPoint, idea);

export const updateIdea = (id, idea) => http.patch(ideaUrl(id), idea);

export const deleteIdea = (id) => http.delete(ideaUrl(id));
